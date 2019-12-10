import { t } from "visual/utils/i18n";
import {
  toolbarElementImageGalleryGridColumn,
  toolbarElementImageGallerySpacing,
  toolbarElementImageGalleryLightBox,
  toolbarDisabledToolbarSettings,
  toolbarDisabledHorizontalAlign,
  toolbarCustomCSS
} from "visual/utils/toolbar";
import { defaultValueKey } from "visual/utils/onChange";

export function getItems({ v, device }) {
  return [
    toolbarDisabledToolbarSettings({ device }),
    toolbarDisabledHorizontalAlign({ device }),
    {
      id: defaultValueKey({ key: "toolbarGallery", device, state: "normal" }),
      type: "popover",
      icon: "nc-gallery",
      title: t("Gallery"),
      position: 80,
      options: [
        toolbarElementImageGalleryGridColumn({ v, device, state: "normal" }),
        toolbarElementImageGallerySpacing({ v, device, state: "normal" }),
        toolbarElementImageGalleryLightBox({
          v,
          device,
          state: "normal",
          devices: "desktop"
        })
      ]
    },
    {
      id: defaultValueKey({ key: "advancedSettings", device, state: "normal" }),
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      position: 110,
      title: t("Settings"),
      roles: ["admin"],
      icon: "nc-cog",
      options: [
        {
          id: defaultValueKey({ key: "settingsTabs", device, state: "normal" }),
          type: "tabs",
          align: "start",
          tabs: [
            {
              id: defaultValueKey({
                key: "settingsStyling",
                device,
                state: "normal"
              }),
              label: t("Styling"),
              tabIcon: "nc-styling",
              options: []
            },
            {
              id: defaultValueKey({
                key: "moreSettingsAdvanced",
                device,
                state: "normal"
              }),
              devices: "desktop",
              label: t("Advanced"),
              tabIcon: "nc-cog",
              options: [
                toolbarCustomCSS({
                  v,
                  device,
                  state: "normal",
                  devices: "desktop"
                })
              ]
            }
          ]
        }
      ]
    }
  ];
}
