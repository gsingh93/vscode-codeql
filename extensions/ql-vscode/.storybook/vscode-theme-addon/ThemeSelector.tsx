import * as React from "react";
import { FunctionComponent, useCallback } from "react";

import { useGlobals } from "@storybook/api";
import {
  IconButton,
  Icons,
  WithTooltip,
  TooltipLinkList,
  Link,
  WithHideFn,
} from "@storybook/components";

import { themeNames, VSCodeTheme } from "./theme";

export const ThemeSelector: FunctionComponent = () => {
  const [{ vscodeTheme }, updateGlobals] = useGlobals();

  const changeTheme = useCallback(
    (theme: VSCodeTheme) => {
      updateGlobals({
        vscodeTheme: theme,
      });
    },
    [updateGlobals],
  );

  const createLinks = useCallback(
    (onHide: () => void): Link[] =>
      Object.values(VSCodeTheme).map((theme) => ({
        id: theme,
        onClick() {
          changeTheme(theme);
          onHide();
        },
        title: themeNames[theme],
        value: theme,
        active: vscodeTheme === theme,
      })),
    [vscodeTheme, changeTheme],
  );

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnClick
      tooltip={({ onHide }: WithHideFn) => (
        <TooltipLinkList links={createLinks(onHide)} />
      )}
    >
      <IconButton
        key="theme"
        title="Change the theme of the preview"
        active={vscodeTheme !== VSCodeTheme.Dark}
      >
        <Icons icon="dashboard" />
      </IconButton>
    </WithTooltip>
  );
};
