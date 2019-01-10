module.exports = (dato, root, i18n) => {
  const information = dato.information.toMap()
  const buttons = dato.buttons.map(button => button.toMap())
  root.createDataFile("data.json", "json", { information, buttons })
}
