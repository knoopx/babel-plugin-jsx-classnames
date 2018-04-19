import { transform } from '@babel/core'
import jsxClassNames from '../src'

function apply(code) {
  return transform(code, { plugins: [jsxClassNames] }).code
}

describe('babel-plugin-jsx-classnames', () => {
  it('ignores non-className props', () => {
    expect(apply(`<div anotherProp="a" />`)).toEqual(`<div anotherProp="a" />;`)
  })

  it('ignores string-literal className prop', () => {
    expect(apply(`<div className="a" />`)).toEqual(`<div className="a" />;`)
  })

  it('ignores string className prop within classNames', () => {
    expect(apply(`<div className={"a"} />`)).toEqual(`<div className={"a"} />;`)
  })

  it('wraps array className prop within classNames', () => {
    expect(apply(`<div className={["a"]} />`)).toEqual(
      `import _classNames from "classnames";\n<div className={_classNames(["a"])} />;`,
    )
  })

  it('wraps object className prop within classNames', () => {
    expect(apply(`<div className={{a: true}} />`)).toEqual(
      `import _classNames from "classnames";\n<div className={_classNames({\n  a: true\n})} />;`,
    )
  })
})
