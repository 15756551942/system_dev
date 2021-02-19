import React from 'react'

import { Cascader } from 'antd'

const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: true,
  },
]

const CasCader = () => {
  const [options, setOptions] = React.useState(optionLists)

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ]
      setOptions([...options])
    }, 1000)
  }

  return <Cascader options={options} loadData={loadData} />
}

export default CasCader