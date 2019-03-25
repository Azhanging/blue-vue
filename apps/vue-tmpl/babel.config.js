module.exports = {
  presets: [
    ['@vue/app', { useBuiltIns: "usage" }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
