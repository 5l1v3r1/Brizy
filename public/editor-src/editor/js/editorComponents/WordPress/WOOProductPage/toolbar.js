import { t } from "visual/utils/i18n";
import { defaultValueKey } from "visual/utils/onChange";
import {
  toolbarElementWOOProductPageProductID,
  toolbarSizeWidthWidthPercent,
  toolbarDisabledAdvancedSettings
} from "visual/utils/toolbar";

export function getItems({ v, device }) {
  return [
    {
      id: defaultValueKey({
        key: "toolbarWOOProductPage",
        device,
        state: "normal"
      }),
      devices: "desktop",
      type: "popover",
      icon: "nc-woo-2",
      position: 10,
      options: [
        toolbarElementWOOProductPageProductID({
          v,
          device,
          devices: "desktop",
          state: "normal"
        })
      ]
    },
    toolbarDisabledAdvancedSettings({ device }),
    {
      id: defaultValueKey({ key: "toolbarSettings", device, state: "normal" }),
      type: "popover",
      roles: ["admin"],
      icon: "nc-cog",
      position: 110,
      options: [
        toolbarSizeWidthWidthPercent({
          v,
          device,
          state: "normal"
        }),
        {
          id: defaultValueKey({
            key: "advancedSettings",
            device,
            state: "normal"
          }),
          type: "advancedSettings",
          label: t("More Settings"),
          icon: "nc-cog",
          options: []
        }
      ]
    }
  ];
}
