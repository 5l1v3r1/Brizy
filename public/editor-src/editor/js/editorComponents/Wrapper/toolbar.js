import { t } from "visual/utils/i18n";

import {
  toolbarHorizontalAlign,
  toolbarPaddingFourFields,
  toolbarMargin,
  toolbarShowOnDesktop,
  toolbarShowOnResponsive,
  toolbarZIndex,
  toolbarCSSID,
  toolbarCustomCSSClass,
  toolbarEntranceAnimation
} from "visual/utils/toolbar";
import { defaultValueKey } from "visual/utils/onChange";

import { getDynamicContentChoices } from "visual/utils/options";

export function getItems({ v, device }) {
  const cssIDDynamicContentChoices = getDynamicContentChoices("richText");

  return [
    toolbarShowOnResponsive({
      v,
      device,
      state: "normal",
      devices: "responsive"
    }),
    toolbarHorizontalAlign({ v, device }),
    {
      id: defaultValueKey({ key: "toolbarSettings", device }),
      type: "popover",
      title: t("Settings"),
      position: 110,
      options: [
        {
          id: defaultValueKey({ key: "advancedSettings", device }),
          type: "advancedSettings",
          label: t("More Settings"),
          icon: "nc-cog",
          options: [
            {
              id: "settingsTabs",
              type: "tabs",
              devices: "desktop",
              align: "start",
              tabs: [
                {
                  id: "settingsStyling",
                  label: t("Styling"),
                  tabIcon: "nc-styling",
                  options: [
                    toolbarPaddingFourFields({
                      v,
                      device,
                      state: "normal"
                    }),
                    toolbarMargin({
                      v,
                      device,
                      state: "normal",
                      onChangeGrouped: ["onChangeMarginGrouped"],
                      onChangeUngrouped: ["onChangeMarginUngrouped"]
                    })
                  ]
                },
                {
                  id: "moreSettingsAdvanced",
                  label: t("Advanced"),
                  tabIcon: "nc-cog",
                  devices: "desktop",
                  options: [
                    toolbarShowOnDesktop({ v, device }),
                    toolbarZIndex({ v, device }),
                    toolbarCSSID({
                      v,
                      device,
                      devices: "desktop",
                      state: "normal",
                      population: cssIDDynamicContentChoices
                    }),
                    toolbarCustomCSSClass({
                      v,
                      device,
                      devices: "desktop",
                      state: "normal",
                      population: cssIDDynamicContentChoices
                    }),
                    toolbarEntranceAnimation({ v, device })
                  ]
                }
              ]
            },
            toolbarPaddingFourFields({
              v,
              device,
              devices: "responsive",
              state: "normal"
            }),
            toolbarMargin({
              v,
              device,
              devices: "responsive",
              state: "normal",
              onChangeGrouped: ["onChangeMarginGrouped"],
              onChangeUngrouped: ["onChangeMarginUngrouped"]
            })
          ]
        }
      ]
    },
    {
      id: defaultValueKey({ key: "advancedSettings", device }),
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      icon: "nc-cog",
      position: 110,
      options: [
        {
          id: "settingsTabs",
          type: "tabs",
          devices: "desktop",
          align: "start",
          tabs: [
            {
              id: "settingsStyling",
              label: t("Styling"),
              tabIcon: "nc-styling",
              options: [
                toolbarPaddingFourFields({
                  v,
                  device,
                  state: "normal"
                }),
                toolbarMargin({
                  v,
                  device,
                  state: "normal",
                  onChangeGrouped: ["onChangeMarginGrouped"],
                  onChangeUngrouped: ["onChangeMarginUngrouped"]
                })
              ]
            },
            {
              id: "moreSettingsAdvanced",
              label: t("Advanced"),
              tabIcon: "nc-cog",
              devices: "desktop",
              options: [
                toolbarShowOnDesktop({ v, device }),
                toolbarZIndex({ v, device }),
                toolbarCSSID({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal",
                  population: cssIDDynamicContentChoices
                }),
                toolbarCustomCSSClass({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal",
                  population: cssIDDynamicContentChoices
                }),
                toolbarEntranceAnimation({ v, device })
              ]
            }
          ]
        },
        toolbarPaddingFourFields({
          v,
          device,
          devices: "responsive",
          state: "normal"
        }),
        toolbarMargin({
          v,
          device,
          devices: "responsive",
          state: "normal",
          onChangeGrouped: ["onChangeMarginGrouped"],
          onChangeUngrouped: ["onChangeMarginUngrouped"]
        })
      ]
    }
  ];
}
