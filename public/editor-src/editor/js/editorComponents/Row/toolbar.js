import Config from "visual/global/Config";
import { t } from "visual/utils/i18n";
import { hexToRgba } from "visual/utils/color";
import {
  getOptionColorHexByPalette,
  getDynamicContentChoices
} from "visual/utils/options";
import { defaultValueKey, defaultValueValue } from "visual/utils/onChange";
import {
  toolbarElementContainerTypeAll,
  toolbarBgImage,
  toolbarBgVideoUrl,
  toolbarBgVideoQuality,
  toolbarBgVideoLoop,
  toolbarBgMapAddress,
  toolbarBgMapZoom,
  toolbarBorderRadius,
  toolbarBorder2,
  toolbarBorderColorHexField2,
  toolbarBorderWidthFourFields2,
  toolbarGradientType,
  toolbarBgColor2,
  toolbarBgColorHexField2,
  toolbarGradientLinearDegree,
  toolbarGradientRadialDegree,
  toolbarBoxShadow2,
  toolbarBoxShadowHexField2,
  toolbarBoxShadowFields2,
  toolbarHoverTransition,
  toolbarShowOnDesktop,
  toolbarShowOnResponsive,
  toolbarPaddingFourFields,
  toolbarMargin,
  toolbarZIndex,
  toolbarCSSID,
  toolbarCustomCSSClass,
  toolbarEntranceAnimation,
  toolbarElementContainerTypeImageMap,
  toolbarImageLinkExternal,
  toolbarLinkExternalBlank,
  toolbarLinkExternalRel,
  toolbarLinkAnchor,
  toolbarSizeWidthSizePercent,
  toolbarElementRowColumnsHeightStyle,
  toolbarElementRowColumnsHeight,
  toolbarVerticalAlign,
  toolbarTags
} from "visual/utils/toolbar";

const { isGlobalPopup: IS_GLOBAL_POPUP } = Config.get("wp") || {};

export function getItems({ v, device, component }) {
  const dvk = key => defaultValueKey({ key, device, state: "normal" });
  const dvv = key => defaultValueValue({ v, key, device, state: "normal" });
  const dvvh = key => defaultValueValue({ v, key, device, state: "hover" });
  const cssIDDynamicContentChoices = getDynamicContentChoices("richText");

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    dvv("bgColorHex"),
    dvv("bgColorPalette")
  );

  const inPopup = Boolean(component.props.meta.sectionPopup);
  const inPopup2 = Boolean(component.props.meta.sectionPopup2);

  return [
    toolbarShowOnResponsive({ v, device, devices: "responsive" }),
    {
      id: dvk("toolbarMedia"),
      type: "popover",
      icon: "nc-background",
      title: t("Background"),
      position: 80,
      options: [
        {
          id: dvk("tabsState"),
          tabsPosition: "left",
          type: "tabs",
          value: dvv("tabsState"),
          tabs: [
            {
              id: dvk("tabNormal"),
              tabIcon: "nc-circle",
              title: t("Normal"),
              options: [
                {
                  id: dvk("tabsMedia"),
                  type: "tabs",
                  value: dvv("tabsMedia"),
                  tabs: [
                    {
                      id: dvk("tabMedia"),
                      label: t("Background"),
                      options: [
                        toolbarElementContainerTypeAll({
                          v,
                          device,
                          devices: "desktop",
                          state: "normal"
                        }),
                        toolbarElementContainerTypeImageMap({
                          v,
                          device,
                          devices: "responsive",
                          state: "normal"
                        }),
                        toolbarBgImage({
                          v,
                          device,
                          state: "normal",
                          devices: "desktop",
                          disabled: dvv("media") !== "image",
                          onChange: [
                            "onChangeBgImage",
                            "onChangeBgImageBgOpacity",
                            "onChangeBgImageDependencies",
                            "onChangeBgImageColumnAndRowSyncMobile"
                          ]
                        }),
                        toolbarBgImage({
                          v,
                          device,
                          state: "normal",
                          devices: "responsive",
                          disabled:
                            dvv("media") !== "image" &&
                            dvv("media") !== "video",
                          onChange: [
                            "onChangeBgImage",
                            "onChangeBgImageBgOpacity",
                            "onChangeBgImageDependencies",
                            "onChangeBgImageColumnAndRowSyncMobile"
                          ]
                        }),
                        toolbarBgVideoUrl({
                          v,
                          device,
                          devices: "desktop",
                          state: "normal",
                          disabled: dvv("media") !== "video"
                        }),
                        toolbarBgVideoQuality({
                          v,
                          device,
                          devices: "desktop",
                          state: "normal",
                          disabled: dvv("media") !== "video"
                        }),
                        toolbarBgVideoLoop({
                          v,
                          device,
                          devices: "desktop",
                          state: "normal",
                          disabled: dvv("media") !== "video"
                        }),
                        toolbarBgMapAddress({
                          v,
                          device,
                          devices: "desktop",
                          state: "normal",
                          disabled: dvv("media") !== "map"
                        }),
                        toolbarBgMapZoom({
                          v,
                          device,
                          state: "normal",
                          disabled: dvv("media") !== "map"
                        })
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: dvk("tabHover"),
              tabIcon: "nc-hover",
              title: t("Hover"),
              options: [
                {
                  id: dvk("tabsMedia"),
                  type: "tabs",
                  devices: "desktop",
                  disabled:
                    dvv("tabsMedia") === "tabMedia" &&
                    (dvv("media") === "video" || dvv("media") === "map"),
                  value: dvv("tabsMedia"),
                  tabs: [
                    {
                      id: dvk("tabMedia"),
                      label: t("Background"),
                      options: [
                        toolbarBgImage({
                          v,
                          device,
                          devices: "desktop",
                          state: "hover",
                          onChange: [
                            "onChangeBgImage",
                            "onChangeBgImageBgOpacity",
                            "onChangeBgImageDependencies",
                            "onChangeBgImageColumnAndRowSyncMobile"
                          ]
                        })
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        [dvk("tabsMedia")]: !isOpen ? "" : dvv("tabsMedia")
      })
    },
    {
      id: dvk("toolbarColor"),
      type: "popover",
      size: "auto",
      title: t("Colors"),
      position: 90,
      icon: {
        style: {
          backgroundColor: hexToRgba(bgColorHex, dvv("bgColorOpacity"))
        }
      },
      options: [
        {
          id: dvk("tabsState"),
          tabsPosition: "left",
          type: "tabs",
          value: dvv("tabsState"),
          tabs: [
            {
              id: dvk("tabNormal"),
              tabIcon: "nc-circle",
              title: t("Normal"),
              options: [
                {
                  id: dvk("tabsColor"),
                  type: "tabs",
                  value: dvv("tabsColor"),
                  tabs: [
                    {
                      id: dvk("tabOverlay"),
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          state: "normal",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityDependencies2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradient: ["onChangeGradientRange2"]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 30,
                              options: [
                                toolbarBgColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  prefix:
                                    dvv("gradientActivePointer") ===
                                    "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityDependencies2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: [
                                toolbarGradientType({
                                  v,
                                  device,
                                  state: "normal",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled: dvv("bgColorType") === "solid"
                                })
                              ]
                            },
                            {
                              width: 18,
                              options: [
                                toolbarGradientLinearDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    dvv("bgColorType") === "solid" ||
                                    dvv("gradientType") === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  state: "normal",
                                  disabled:
                                    dvv("bgColorType") === "solid" ||
                                    dvv("gradientType") === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: dvk("tabBorder"),
                      label: t("Border"),
                      options: [
                        toolbarBorder2({
                          v,
                          device,
                          state: "normal",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthFourFields2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: dvk("tabBoxShadow"),
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "normal",
                          onChangeType: [
                            "onChangeBoxShadowType2",
                            "onChangeBoxShadowTypeDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "normal",
                                  onChange: [
                                    "onChangeBoxShadowFields2",
                                    "onChangeBoxShadowFieldsDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: dvk("tabHover"),
              tabIcon: "nc-hover",
              title: t("Hover"),
              options: [
                {
                  id: dvk("tabsColor"),
                  type: "tabs",
                  value: dvv("tabsColor"),
                  devices: "desktop",
                  tabs: [
                    {
                      id: dvk("tabOverlay"),
                      label: t("Overlay"),
                      options: [
                        toolbarBgColor2({
                          v,
                          device,
                          devices: "desktop",
                          state: "hover",
                          onChangeType: ["onChangeBgColorType2"],
                          onChangeHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientHex: [
                            "onChangeBgColorHexAndOpacity2",
                            "onChangeBgColorHexAndOpacityPalette2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradientPalette: [
                            "onChangeBgColorPalette2",
                            "onChangeBgColorPaletteOpacity2",
                            "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangeGradient: ["onChangeGradientRange2"]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 30,
                              options: [
                                toolbarBgColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  prefix:
                                    dvvh("gradientActivePointer") ===
                                    "startPointer"
                                      ? "bg"
                                      : "gradient",
                                  onChange: [
                                    "onChangeBgColorHexAndOpacity2",
                                    "onChangeBgColorHexAndOpacityPalette2",
                                    "onChangeBgColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 52,
                              options: [
                                toolbarGradientType({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  className:
                                    "brz-ed__select--transparent brz-ed__select--align-right",
                                  disabled: dvvh("bgColorType") === "solid"
                                })
                              ]
                            },
                            {
                              width: 18,
                              options: [
                                toolbarGradientLinearDegree({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  disabled:
                                    dvvh("bgColorType") === "solid" ||
                                    dvvh("gradientType") === "radial"
                                }),
                                toolbarGradientRadialDegree({
                                  v,
                                  device,
                                  devices: "desktop",
                                  state: "hover",
                                  disabled:
                                    dvvh("bgColorType") === "solid" ||
                                    dvvh("gradientType") === "linear"
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: dvk("tabBorder"),
                      label: t("Border"),
                      options: [
                        toolbarBorder2({
                          v,
                          device,
                          state: "hover",
                          devices: "desktop",
                          onChangeStyle: [
                            "onChangeBorderStyle2",
                            "onChangeContainerBorderStyleDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBorderColorHexAndOpacity2",
                            "onChangeBorderColorHexAndOpacityPalette2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ],
                          onChangePalette: [
                            "onChangeBorderColorPalette2",
                            "onChangeBorderColorPaletteOpacity2",
                            "onChangeContainerBorderColorHexAndOpacityDependencies2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                            "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 38,
                              options: [
                                toolbarBorderColorHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBorderColorHexAndOpacity2",
                                    "onChangeBorderColorHexAndOpacityPalette2",
                                    "onChangeContainerBorderColorHexAndOpacityDependencies2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncTablet2",
                                    "onChangeBorderColorHexAndOpacityColumnAndRowSyncMobile2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 54,
                              options: [
                                toolbarBorderWidthFourFields2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChangeType: ["onChangeBorderWidthType2"],
                                  onChangeGrouped: [
                                    "onChangeBorderWidthGrouped2",
                                    "onChangeBorderWidthGroupedDependencies2"
                                  ],
                                  onChangeUngrouped: [
                                    "onChangeBorderWidthUngrouped2",
                                    "onChangeBorderWidthUngroupedDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: dvk("tabBoxShadow"),
                      label: t("Shadow"),
                      options: [
                        toolbarBoxShadow2({
                          v,
                          device,
                          state: "hover",
                          devices: "desktop",
                          onChangeType: [
                            "onChangeBoxShadowType2",
                            "onChangeBoxShadowTypeDependencies2"
                          ],
                          onChangeHex: [
                            "onChangeBoxShadowHexAndOpacity2",
                            "onChangeBoxShadowHexAndOpacityPalette2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ],
                          onChangePalette: [
                            "onChangeBoxShadowPalette2",
                            "onChangeBoxShadowPaletteOpacity2",
                            "onChangeBoxShadowHexAndOpacityDependencies2"
                          ]
                        }),
                        {
                          type: "grid",
                          className: "brz-ed-grid__color-fileds",
                          columns: [
                            {
                              width: 41,
                              options: [
                                toolbarBoxShadowHexField2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBoxShadowHexAndOpacity2",
                                    "onChangeBoxShadowHexAndOpacityPalette2",
                                    "onChangeBoxShadowHexAndOpacityDependencies2"
                                  ]
                                })
                              ]
                            },
                            {
                              width: 59,
                              options: [
                                toolbarBoxShadowFields2({
                                  v,
                                  device,
                                  state: "hover",
                                  devices: "desktop",
                                  onChange: [
                                    "onChangeBoxShadowFields2",
                                    "onChangeBoxShadowFieldsDependencies2"
                                  ]
                                })
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      onChange: (_, { isOpen }) => ({
        [dvk("tabsState")]: !isOpen ? "" : dvv("tabsState"),
        [dvk("tabsColor")]: !isOpen ? "" : dvv("tabsColor")
      })
    },
    {
      id: dvk("toolbarLink"),
      type: "popover",
      icon: "nc-link",
      title: t("Link"),
      size: "medium",
      position: 100,
      disabled:
        inPopup || inPopup2 || IS_GLOBAL_POPUP
          ? true
          : device === "desktop"
          ? v.linkLightBox === "on"
          : dvv("linkType") !== "popup" || dvv("linkPopup") === "",
      options: [
        {
          id: dvk("linkType"),
          type: "tabs",
          value: dvv("linkType"),
          tabs: [
            {
              id: dvk("external"),
              label: t("URL"),
              options: [
                toolbarImageLinkExternal({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal"
                }),
                toolbarLinkExternalBlank({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal"
                }),
                toolbarLinkExternalRel({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal"
                })
              ]
            },
            {
              id: dvk("anchor"),
              label: t("Block"),
              options: [
                toolbarLinkAnchor({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal"
                })
              ]
            }
          ]
        }
      ]
    },
    {
      id: dvk("toolbarLinkResponsive"),
      type: "popover",
      icon: "nc-link",
      title: t("Link"),
      size: "medium",
      position: 100,
      devices: "responsive",
      disabled: dvv("linkType") !== "popup" || dvv("linkPopup") === "",
      options: [
        {
          id: dvk("linkType"),
          type: "tabs",
          value: dvv("linkType"),
          tabs: []
        }
      ]
    },
    {
      id: dvk("toolbarSettings"),
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      position: 100,
      devices: "desktop",
      options: [
        toolbarSizeWidthSizePercent({
          v,
          device,
          state: "normal",
          devices: "desktop",
          min: 40,
          max: 100,
          disabled: inPopup || inPopup2 || IS_GLOBAL_POPUP
        }),
        {
          type: dvk("multiPicker"),
          disabled: inPopup2 || IS_GLOBAL_POPUP,
          position: 90,
          picker: toolbarElementRowColumnsHeightStyle({
            v,
            device,
            devices: "desktop",
            state: "normal"
          }),
          choices: {
            custom: [
              toolbarElementRowColumnsHeight({
                v,
                device,
                devices: "desktop",
                state: "normal"
              }),
              toolbarVerticalAlign({
                v,
                device,
                state: "normal",
                devices: "desktop"
              })
            ]
          }
        },
        {
          id: dvk("advancedSettings"),
          type: "advancedSettings",
          sidebarLabel: t("More Settings"),
          label: t("More Settings"),
          icon: "nc-cog",
          position: 110,
          options: [
            {
              id: dvk("settingsTabs"),
              type: "tabs",
              align: "start",
              tabs: [
                {
                  id: dvk("settingsStyling"),
                  label: t("Styling"),
                  tabIcon: "nc-styling",
                  options: [
                    toolbarPaddingFourFields({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarMargin({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop",
                      disabled: inPopup,
                      onChangeGrouped: ["onChangeMarginGrouped"],
                      onChangeUngrouped: ["onChangeMarginUngrouped"]
                    }),
                    toolbarBorderRadius({
                      v,
                      device,
                      state: "normal",
                      onChangeGrouped: [
                        "onChangeBorderRadiusGrouped",
                        "onChangeBorderRadiusGroupedDependencies"
                      ],
                      onChangeUngrouped: [
                        "onChangeBorderRadiusUngrouped",
                        "onChangeBorderRadiusUngroupedDependencies"
                      ]
                    })
                  ]
                },
                {
                  id: dvk("moreSettingsAdvanced"),
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  options: [
                    toolbarShowOnDesktop({ v, devices: "desktop" }),
                    toolbarZIndex({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarCustomCSSClass({
                      v,
                      device,
                      devices: "desktop",
                      state: "normal",
                      population: cssIDDynamicContentChoices
                    }),
                    toolbarCSSID({
                      v,
                      device,
                      devices: "desktop",
                      state: "normal",
                      population: cssIDDynamicContentChoices
                    }),
                    toolbarEntranceAnimation({
                      v,
                      device,
                      state: "normal",
                      devices: "desktop"
                    }),
                    toolbarHoverTransition({
                      v,
                      device,
                      position: 60,
                      devices: "desktop",
                      state: "normal"
                    }),
                    toolbarTags({
                      v,
                      device,
                      state: "normal"
                    })
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: dvk("toolbarSettings"),
      type: "popover",
      icon: "nc-cog",
      title: t("Settings"),
      position: 100,
      devices: "responsive",
      options: [
        toolbarSizeWidthSizePercent({
          v,
          device,
          state: "normal",
          devices: "responsive",
          min: 40,
          max: 100,
          disabled: inPopup || inPopup2 || IS_GLOBAL_POPUP
        }),
        {
          id: dvk("advancedSettings"),
          type: "advancedSettings",
          label: t("More Settings"),
          sidebarLabel: t("More Settings"),
          icon: "nc-cog",
          title: t("Settings"),
          position: 110,
          devices: "responsive",
          options: [
            toolbarPaddingFourFields({
              v,
              device,
              state: "normal",
              devices: "responsive"
            }),
            toolbarMargin({
              v,
              device,
              state: "normal",
              devices: "responsive",
              disabled: inPopup,
              onChangeGrouped: ["onChangeMarginGrouped"],
              onChangeUngrouped: ["onChangeMarginUngrouped"]
            }),
            toolbarBorderRadius({
              v,
              device,
              devices: "responsive",
              state: "normal",
              onChangeGrouped: [
                "onChangeBorderRadiusGrouped",
                "onChangeBorderRadiusGroupedDependencies"
              ],
              onChangeUngrouped: [
                "onChangeBorderRadiusUngrouped",
                "onChangeBorderRadiusUngroupedDependencies"
              ]
            })
          ]
        }
      ]
    }
  ];
}
