export const toString = (obj: object) => {
  if (obj === undefined) {
    return JSON.stringify({})
  }

  return JSON.stringify(obj, (_, val) => {
    if (typeof val === 'function') {
      return val.toString()
    }
    return val
  })
}

export const getJavascriptSource = (options: string) => {
  return `
    var options = ${options || {}}
    const chart = new ApexCharts(document.querySelector('#chart'), options)

    chart.render()

    function parse (data) {
      return JSON.parse(data, function (key, value) {

          if (value
              && typeof value === "string"
              && value.substr(0,8) === "function") {

              const startBody = value.indexOf('{') + 1;
              const endBody = value.lastIndexOf('}');
              const startArgs = value.indexOf('(') + 1;
              const endArgs = value.indexOf(')');

              return new Function(value.substring(startArgs, endArgs)
                                , value.substring(startBody, endBody));
          }
          return value;
      });
    }

    function processMessage(e) {
      const message = parse(e.data)

      switch (message.type) {
        case 'updateSeries':
          const { newSeries, animate } = message.data
          chart.updateSeries(newSeries, animate)
          break
        case 'updateOptions':
          const { newOptions, redrawPaths } = message.data
          chart.updateSeries(newOptions, redrawPaths)
          break
        default:
          break
      }
    }

    window.document.addEventListener('message', processMessage);

    window.addEventListener('message', processMessage);

  `
}
