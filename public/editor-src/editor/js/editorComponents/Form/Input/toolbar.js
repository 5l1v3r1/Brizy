import _ from "underscore";
import * as types from "./types/index";
import { t } from "visual/utils/i18n";
import { tabletSyncOnChange, mobileSyncOnChange } from "visual/utils/onChange";

const getTypeChoices = _.map(types, item => {
  return {
    title: item.componentTitle,
    value: item.componentType
  };
});

export function getItemsForDesktop(v) {
  return [
    {
      id: "toolbarCurrentShortcode",
      type: "popover",
      icon: "nc-form-left",
      title: t("Field"),
      position: 60,
      options: [
        {
          id: "type",
          label: t("Field Type"),
          type: "select",
          position: 10,
          choices: getTypeChoices,
          value: v.type
        },
        {
          id: "required",
          label: t("Required"),
          type: "switch",
          position: 20,
          value: v.required
        },
        {
          id: "width",
          label: t("Width"),
          type: "slider",
          position: 30,
          slider: {
            min: 1,
            max: 100
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "%",
                value: "%"
              }
            ]
          },
          value: {
            value: v.width
          },
          onChange: ({ value: width }) => {
            return {
              width
            };
          }
        },
        {
          id: "height",
          label: t("Height"),
          type: "slider",
          disabled: v.type !== "Paragraph",
          position: 40,
          slider: {
            min: 1,
            max: 300
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "px",
                value: "px"
              }
            ]
          },
          value: {
            value: v.height
          },
          onChange: ({ value: height }) => {
            return {
              height
            };
          }
        }
      ]
    }
  ];
}

export function getItemsForTablet(v) {
  return [
    {
      id: "tabletToolbarCurrentShortcode",
      type: "popover",
      icon: "nc-form-left",
      title: t("Field"),
      position: 60,
      options: [
        {
          id: "tabletWidth",
          label: t("Width"),
          type: "slider",
          position: 30,
          slider: {
            min: 1,
            max: 100
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "%",
                value: "%"
              }
            ]
          },
          value: {
            value: tabletSyncOnChange(v, "width")
          },
          onChange: ({ value: tabletWidth }) => ({ tabletWidth })
        },
        {
          id: "tabletHeight",
          label: t("Height"),
          type: "slider",
          disabled: v.type !== "Paragraph",
          position: 40,
          slider: {
            min: 1,
            max: 300
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "px",
                value: "px"
              }
            ]
          },
          value: {
            value: tabletSyncOnChange(v, "height")
          },
          onChange: ({ value: tabletHeight }) => ({ tabletHeight })
        }
      ]
    }
  ];
}

export function getItemsForMobile(v) {
  return [
    {
      id: "mobileToolbarCurrentShortcode",
      type: "popover",
      icon: "nc-form-left",
      title: t("Field"),
      position: 60,
      options: [
        {
          id: "mobileWidth",
          label: t("Width"),
          type: "slider",
          position: 30,
          slider: {
            min: 1,
            max: 100
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "%",
                value: "%"
              }
            ]
          },
          value: {
            value: mobileSyncOnChange(v, "width")
          },
          onChange: ({ value: mobileWidth }) => ({ mobileWidth })
        },
        {
          id: "mobileHeight",
          label: t("Height"),
          type: "slider",
          disabled: v.type !== "Paragraph",
          position: 40,
          slider: {
            min: 1,
            max: 300
          },
          input: {
            show: true
          },
          suffix: {
            show: true,
            choices: [
              {
                title: "px",
                value: "px"
              }
            ]
          },
          value: {
            value: mobileSyncOnChange(v, "height")
          },
          onChange: ({ value: mobileHeight }) => ({ mobileHeight })
        }
      ]
    }
  ];
}
