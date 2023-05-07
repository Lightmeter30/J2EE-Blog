<script setup lang="ts">
import type { NConfigProvider, GlobalThemeOverrides } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: "12px",
    bodyColor: "#16181DFF",
    cardColor: "#2B303BFF",
    borderColor: "rgb(224, 224, 230)",
  },
  Card: {
    borderColor: "rgba(239, 239, 245, 0)",
  },
  Button: {
    textColor: "#A7AFBE",
    // "textColorTertiary": "rgb(118, 124, 130)",
    textColorHover: "#E2E4E9",
    textColorPressed: "#414958",
    textColorFocus: "#A7AFBE",
    border: "1px solid #A7AFBE",
    borderHover: "1px solid #E2E4E9",
    borderPressed: "1px solid #414958",
    borderFocus: "1px solid #A7AFBE",
    rippleColor: "#E2E4E9",
  },
  Form: {
    "feedbackHeightSmall": "12px",
    "feedbackHeightMedium": "12px",
    "feedbackHeightLarge": "12px",
    "feedbackPadding": "6px 0"
  },
  Menu: {
    borderRadius: "2px",
    itemColorActive: "#414958ff",
    groupTextColor: "rgb(118, 124, 130)",
    itemColorHover: "#414958aa",
    itemColorActiveHover: "#414958dd",
    itemTextColorActive: "#FFFFFFFF",
    itemTextColorHover: "#E2E4E9FF",
    itemTextColor: "#A7AFBEFF",
    itemTextColorChildActive: "#FFFFFFFF",
    itemTextColorActiveHover: "#FFFFFFFF",
    itemTextColorChildActiveHover: "#FFFFFFFF",
    itemColorActiveCollapsed: "rgba(222, 222, 222, 0.15)",
    itemTextColorHoverHorizontal: "#E2E4E9FF",
    itemTextColorHorizontal: "#A7AFBEff",
    itemTextColorActiveHoverHorizontal: "#FFFFFFFF",
    itemTextColorActiveHorizontal: "#FFFFFFFF",
    itemTextColorChildActiveHorizontal: "#FFFFFFFF",
    itemIconColor: "#A7AFBEFF",
    itemTextColorChildActiveHoverHorizontal: "#FFFFFFFF",
    itemIconColorActive: "#FFFFFFFF",
    itemIconColorHover: "#E2E4E9FF",
    itemIconColorActiveHover: "#FFFFFFFF",
    itemIconColorChildActive: "#FFFFFFFF",
    itemIconColorChildActiveHover: "#FFFFFFFF",
    itemIconColorHoverHorizontal: "#E2E4E9FF",
    itemIconColorActiveHoverHorizontal: "#FFFFFFFF",
    itemIconColorChildActiveHoverHorizontal: "#FFFFFFFF",
    itemIconColorActiveHorizontal: "#FFFFFFFF",
    itemIconColorChildActiveHorizontal: "#FFFFFFFF",
  },
  Input: {
    caretColor: "#DDB055FF",
    textColor: "#D9D9D9",
    colorFocus: "rgba(89,107,117,0.9)",
    loadingColor: "#2B303BFF",
    boxShadowFocus: "inset 1px 1px 4px rgba(0, 0, 0, 0.25)",
    borderFocus: "5px solid rgba(13, 38, 58, 0.8)",
    borderHover: "1px solid #0D263A",
    border: "1px solid #0D263A",
    borderDisabled: "none",
    countTextColor: "rgba(255, 255, 255, 0.52)",
    color: "#596B75",
    textDecorationColor: "rgba(255, 255, 255, 0.82)",
    textColorDisabled: "rgba(255, 255, 255, 0.38)",
    groupLabelTextColor: "rgba(255, 255, 255, 0.82)",
    placeholderColor: "#A7AFBEFF",
    caretColorError: "#BD424CFF",
    loadingColorError: "#BD424CFF",
    borderError: "2px solid #BD424C",
    borderHoverError: "2px solid #BD424C",
    boxShadowFocusError: "inset 1px 1px 4px rgba(0, 0, 0, 0.25)",
    colorFocusError: "#075469",
    borderFocusError: "2px solid #BD424C",
    loadingColorWarning: "#DDB055FF",
    caretColorWarning: "#DDB055FF",
    borderWarning: "2px solid #DDB055",
    borderHoverWarning: "2px solid #DDB055",
    colorFocusWarning: "#414958FF",
    borderFocusWarning: "2px solid #DDB055",
    boxShadowFocusWarning: "inset 1px 1px 4px rgba(0, 0, 0, 0.25)",
  },
  Tabs: {
    barColor: "#F2B705",
  },
  "Slider": {
    "railColor": "rgba(89, 107, 117, 0.2)",
    "railColorHover": "rgba(89, 107, 117, 0.2)",
    "fillColor": "rgba(13, 38, 58, 0.5)",
    "fillColorHover": "rgba(13, 38, 58, 0.5)",
    "handleColor": "#0D263AFF",
    "handleSize": "12px",
    "indicatorColor": "rgba(172, 170, 171, 1)",
    "indicatorTextColor": "rgba(13, 38, 58, 1)"
  },
  "Drawer": {
    "color": "rgba(172, 170, 171, 0.9)",
    "textColor": "#0D263AFF",
    "titleTextColor": "rgba(13, 38, 58, 0.8)",
    "headerBorderBottom": "1px solid rgba(13, 38, 58, 0.09)"
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides"> <!-- :theme-overrides="themeOverrides" -->
    <n-message-provider>
      <n-dialog-provider>
        <top-index />
        <div style="height: 50px;"></div>
        <router-view />
        <n-back-top :right="30" />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss" >
body,
html,
.n-config-provider {
  height: 100%;
  border: 0;
  margin: 0;
}

body {
  background: $cloud-0-hex;
}

#app {
  height: 100%;
  width: 100%;
  // background: $cloud-0-hex;
}

* {
  list-style: none;
  user-select: none;
}
</style>
