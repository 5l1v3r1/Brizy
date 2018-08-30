import React from "react";
import _ from "underscore";
import ResizeAware from "react-resize-aware";
import EditorComponent from "visual/editorComponents/EditorComponent";
import BoxResizer from "visual/component-new/BoxResizer";
import Placeholder from "visual/component-new/Placeholder";
import Link from "visual/component-new/Link";
import Toolbar from "visual/component-new/Toolbar";
import { MIN_COL_WIDTH } from "visual/config/columns";
import { imageUrl } from "visual/utils/image";
import { getStore } from "visual/redux/store";
import defaultValue from "./defaultValue.json";
import toolbarConfigFn, {
  getMinSize,
  getMaxSize,
  getMinHeight
} from "./toolbar";
import { calcImageSizes, calcWrapperSizes } from "./calculations";
import {
  imageStylesClassName,
  imageStylesCSSVars,
  contentStyleClassName,
  contentStyleCSSVars,
  wrapperStyleClassName,
  wrapperStyleCSSVars,
  imgStyleClassName,
  imgStyleCSSVars
} from "./styles";

const resizerPoints = [
  "topLeft",
  "topCenter",
  "topRight",
  "bottomLeft",
  "bottomCenter",
  "bottomRight"
];

const resizerTransformValue = v => {
  const { resize, mobileResize, ...rest } = v;

  return {
    size: resize,
    mobileSize: mobileResize,
    ...rest
  };
};
const resizerTransformPatch = patch => {
  if (patch.size) {
    patch.resize = patch.size;
    delete patch.size;
  }

  if (patch.mobileSize) {
    patch.mobileResize = patch.mobileSize;
    delete patch.mobileSize;
  }

  return patch;
};

class Image extends EditorComponent {
  static get componentId() {
    return "Image";
  }

  static defaultValue = defaultValue;

  constructor(props) {
    super(props);
    const { desktopW: containerWidth, mobileW } = this.props.meta;
    const maxDesktopContainerWidth = Math.round(
      this.getMaxContainerWidth(containerWidth)
    );
    const maxMobileContainerWidth = Math.round(
      this.getMaxContainerWidth(mobileW, "mobile")
    );

    this.state = {
      containerWidth,
      maxDesktopContainerWidth,
      maxMobileContainerWidth
    };
  }

  componentDidMount() {
    this.mounted = true;

    this.handleResize();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleContainerRef = el => {
    this.container = el;
  };

  handleResize = () => {
    this.updateContainerMaxWidth();
    this.updateContainerWidth();
  };

  handleResizerChange = patch => this.patchValue(resizerTransformPatch(patch));

  updateContainerWidth = () => {
    const { containerWidth: stateContainerWidth } = this.state;

    if (this.mounted && getStore().getState().ui.deviceMode === "desktop") {
      const containerWidth = this.container.clientWidth;

      if (containerWidth !== stateContainerWidth) {
        this.setState({ containerWidth });
      }
    }
  };

  updateContainerMaxWidth = _.debounce(() => {
    const { mobileW } = this.props.meta;

    const {
      containerWidth,
      maxDesktopContainerWidth: oldMaxDesktopContainerWidth,
      maxMobileContainerWidth: oldMaxMobileContainerWidth
    } = this.state;
    const maxDesktopContainerWidth = Math.round(
      this.getMaxContainerWidth(containerWidth)
    );
    const maxMobileContainerWidth = Math.round(
      this.getMaxContainerWidth(mobileW, "mobile")
    );

    if (
      maxDesktopContainerWidth > oldMaxDesktopContainerWidth ||
      maxMobileContainerWidth > oldMaxMobileContainerWidth
    ) {
      this.setState({ maxDesktopContainerWidth, maxMobileContainerWidth });
    }
  }, 2000);

  generatePopulation(population, { cW, cH }) {
    population = population.replace("{{", "").replace("}}", "");

    return `{{${population} cW='${cW}' cH='${cH}'}}`;
  }

  getMaxContainerWidth = (containerWidth, type = "desktop") => {
    const v = this.getValue();
    const widthStepInPercent = 20;
    const imgSizes = this.getImageSizes(v, containerWidth);

    let shortcodeWidthInPercent;
    let maxDesktopContainerWidth;
    if (this.props.meta.row && this.props.meta.row.itemsLength) {
      const {
        row: { itemsLength },
        desktopW
      } = this.props.meta;

      maxDesktopContainerWidth = desktopW - MIN_COL_WIDTH * (itemsLength - 1);
      shortcodeWidthInPercent =
        (imgSizes[type].width * 100) / maxDesktopContainerWidth;
    } else {
      maxDesktopContainerWidth = containerWidth;
      shortcodeWidthInPercent = (imgSizes[type].width * 100) / containerWidth;
    }

    const maxWidthPercent =
      Math.ceil(shortcodeWidthInPercent / widthStepInPercent) *
      widthStepInPercent;

    return Math.min(
      (maxWidthPercent * maxDesktopContainerWidth) / 100,
      v.imageWidth
    );
  };

  getImageSizes = (v, containerWidth) => {
    const {
      imageWidth,
      imageHeight,
      positionX,
      positionY,
      resize,
      zoom,
      width,
      height
    } = v;
    const { mobileW } = this.props.meta;
    const desktopValue = {
      imageWidth,
      imageHeight,
      positionX,
      positionY,
      resize,
      zoom,
      width,
      height
    };
    const mobileValue = {
      imageWidth,
      imageHeight,
      positionX: v.mobilePositionX,
      positionY: v.mobilePositionY,
      resize: v.mobileResize,
      zoom: v.mobileZoom,
      width,
      height: v.mobileHeight
    };

    return {
      desktop: calcImageSizes(containerWidth, desktopValue),
      mobile: calcImageSizes(mobileW, mobileValue)
    };
  };

  getImageOptions({ iW, iH, oX, oY, cW, cH }, imagePopulation, multiplier = 1) {
    if (imagePopulation) {
      return {
        cW: cW * multiplier,
        cH: cH * multiplier
      };
    }

    return {
      iW: iW * multiplier,
      iH: iH * multiplier,
      oX: oX * multiplier,
      oY: oY * multiplier,
      cW: cW * multiplier,
      cH: cH * multiplier
    };
  }

  renderForEdit(_v) {
    const v = this.applyRulesToValue(_v, [
      _v.boxShadowColorPalette && `${_v.boxShadowColorPalette}__boxShadow`
    ]);

    const {
      imageWidth,
      imageHeight,
      imageSrc,
      imagePopulation,
      positionX,
      positionY,
      resize,
      zoom,
      width,
      height,
      linkType,
      linkAnchor,
      linkExternal,
      linkExternalBlank,
      linkExternalRel,
      linkLightBox,
      linkExternalType,
      linkPopulation
    } = v;
    const { desktopW, mobileW } = this.props.meta;
    const {
      containerWidth,
      maxDesktopContainerWidth,
      maxMobileContainerWidth
    } = this.state;

    const imageSizes = this.getImageSizes(v, containerWidth);

    const mobileImageOptions = { iW: maxMobileContainerWidth, iH: "any" };
    const mobileImageOptions2X = { iW: maxMobileContainerWidth * 2, iH: "any" };
    const mobileSrcSet = `${imageUrl(
      imageSrc,
      mobileImageOptions
    )} 1x, ${imageUrl(imageSrc, mobileImageOptions2X)} 2x`;

    const desktopImageOptions = { iW: maxDesktopContainerWidth, iH: "any" };
    const desktopImageOptions2X = {
      iW: maxDesktopContainerWidth * 2,
      iH: "any"
    };
    const desktopSrcSet = `${imageUrl(
      imageSrc,
      desktopImageOptions
    )} 1x, ${imageUrl(imageSrc, desktopImageOptions2X)} 2x`;

    let content;

    if (imagePopulation) {
      content = <Placeholder icon="nc-dynamic-img" containerWidth={desktopW} />;
    } else if (imageSrc) {
      content = (
        <picture>
          <source srcSet={desktopSrcSet} media="(min-width: 992px)" />
          <img
            className={imgStyleClassName(v)}
            style={imgStyleCSSVars(v, imageSizes)}
            srcSet={mobileSrcSet}
            src={imageUrl(imageSrc, mobileImageOptions)}
            draggable={false}
          />
        </picture>
      );
    } else {
      content = <Placeholder icon="nc-img" containerWidth={desktopW} />;
    }

    const external = {
      linkExternal,
      linkPopulation
    };
    const hrefs = {
      anchor: linkAnchor,
      external: external[linkExternalType],
      lightBox:
        linkLightBox === "on" ? imageUrl(imageSrc, { iW: 1200, iH: "any" }) : ""
    };

    if (hrefs[linkType] !== "") {
      content = (
        <Link
          type={linkType}
          href={hrefs[linkType]}
          target={linkExternalBlank}
          rel={linkExternalRel}
        >
          {content}
        </Link>
      );
    }

    const desktopValue = {
      imageSrc,
      imageWidth,
      imageHeight,
      positionX,
      positionY,
      resize,
      zoom,
      width,
      height
    };
    const mobileValue = {
      imageSrc,
      imageWidth,
      imageHeight,
      positionX: v.mobilePositionX,
      positionY: v.mobilePositionY,
      resize: v.mobileResize,
      zoom: v.mobileZoom,
      width,
      height: v.mobileHeight
    };
    const wrapperSizes = {
      desktop: calcWrapperSizes(containerWidth, desktopValue),
      mobile: calcWrapperSizes(mobileW, mobileValue)
    };
    const toolbarConfig = toolbarConfigFn({
      desktopWrapperSizes: wrapperSizes.desktop,
      desktopContainerWidth: containerWidth,
      mobileWrapperSizes: wrapperSizes.mobile,
      mobileContainerWidth: mobileW
    });

    const resizerRestrictions = {
      height: {
        min: getMinHeight(),
        max: Infinity
      },
      size: {
        min: getMinSize(),
        max: getMaxSize()
      }
    };

    return (
      <div
        ref={this.handleContainerRef}
        className={imageStylesClassName(v, wrapperSizes, this.props)}
        style={imageStylesCSSVars(v)}
      >
        <Toolbar {...this.makeToolbarPropsFromConfig(toolbarConfig)}>
          <div
            className={contentStyleClassName(v)}
            style={contentStyleCSSVars(v, wrapperSizes)}
          >
            <BoxResizer
              restrictions={resizerRestrictions}
              points={resizerPoints}
              meta={this.props.meta}
              value={resizerTransformValue(v)}
              onChange={this.handleResizerChange}
            >
              <div
                className={wrapperStyleClassName(v)}
                style={wrapperStyleCSSVars(v, wrapperSizes)}
              >
                {content}
              </div>
            </BoxResizer>
          </div>
        </Toolbar>
        {IS_EDITOR && <ResizeAware onResize={this.handleResize} />}
      </div>
    );
  }

  renderForView(_v) {
    const v = this.applyRulesToValue(_v, [
      _v.boxShadowColorPalette && `${_v.boxShadowColorPalette}__boxShadow`
    ]);

    const {
      imagePopulation,
      imageWidth,
      imageHeight,
      imageSrc,
      linkType,
      linkAnchor,
      linkExternal,
      linkExternalBlank,
      linkExternalRel,
      linkLightBox,
      linkExternalType,
      linkPopulation
    } = v;
    const { desktopW, mobileW } = this.props.meta;
    const wrapperSizes = {
      desktop: calcWrapperSizes(desktopW, v),
      mobile: calcWrapperSizes(mobileW, {
        imageWidth,
        imageHeight,
        resize: v.mobileResize,
        width: v.mobileWidth,
        height: v.mobileHeight
      })
    };
    const imageSizes = this.getImageSizes(v, desktopW);

    const { width: cW, height: cH } = wrapperSizes.desktop;
    let {
      width: iW,
      height: iH,
      marginLeft: oX,
      marginTop: oY
    } = imageSizes.desktop;

    // Mobile
    const { width: mCW, height: mCH } = wrapperSizes.mobile;
    let {
      width: mIW,
      height: mIH,
      marginLeft: mOX,
      marginTop: mOY
    } = imageSizes.mobile;

    oX = Math.abs(oX);
    oY = Math.abs(oY);
    const options = { iW, iH, oX, oY, cW, cH };
    const imageOptions = this.getImageOptions(options, imagePopulation);
    const imageOptions2X = this.getImageOptions(options, imagePopulation, 2);

    mOX = Math.abs(mOX);
    mOY = Math.abs(mOY);
    const mOptions = {
      iW: mIW,
      iH: mIH,
      oX: mOX,
      oY: mOY,
      cW: mCW,
      cH: mCH
    };
    const mobileImageOptions = this.getImageOptions(mOptions, imagePopulation);
    const mobileImageOptions2X = this.getImageOptions(
      mOptions,
      imagePopulation,
      2
    );

    let sourceSrcSet;
    let desktopSrc;
    let mobileSrc;

    if (imagePopulation) {
      sourceSrcSet = `${this.generatePopulation(
        imagePopulation,
        imageOptions
      )} 1x, ${this.generatePopulation(imagePopulation, imageOptions2X)} 2X`;

      desktopSrc = this.generatePopulation(imagePopulation, mobileImageOptions);

      mobileSrc = `${this.generatePopulation(
        imagePopulation,
        mobileImageOptions
      )} 1x, ${this.generatePopulation(
        imagePopulation,
        mobileImageOptions2X
      )} 2X`;
    } else {
      sourceSrcSet = `${imageUrl(imageSrc, imageOptions)} 1x, ${imageUrl(
        imageSrc,
        imageOptions2X
      )} 2x`;

      desktopSrc = imageUrl(imageSrc, mobileImageOptions);
      mobileSrc = `${imageUrl(imageSrc, mobileImageOptions)} 1x, ${imageUrl(
        imageSrc,
        mobileImageOptions2X
      )} 2x`;
    }

    let content;
    if (imagePopulation || imageSrc) {
      content = (
        <picture>
          <source srcSet={sourceSrcSet} media="(min-width: 992px)" />
          <img className="brz-img" src={desktopSrc} srcSet={mobileSrc} />
        </picture>
      );
    } else {
      content = <Placeholder icon="nc-img" containerWidth={desktopW} />;
    }

    const external = {
      linkExternal,
      linkPopulation
    };
    const hrefs = {
      anchor: linkAnchor,
      external: external[linkExternalType],
      lightBox:
        linkLightBox === "on" ? imageUrl(imageSrc, { iW: 1200, iH: "any" }) : ""
    };

    if (hrefs[linkType] !== "") {
      content = (
        <Link
          type={linkType}
          href={hrefs[linkType]}
          target={linkExternalBlank}
          rel={linkExternalRel}
        >
          {content}
        </Link>
      );
    }

    return (
      <div className={imageStylesClassName(v, wrapperSizes, this.props)}>
        {content}
      </div>
    );
  }
}

export default Image;
