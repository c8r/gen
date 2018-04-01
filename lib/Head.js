import React from 'react'

class Head extends React.Component {
  static defaultProps = {
    title: 'Gen'
  }

  render () {
    const {
      title,
      description,
      og,
      twitter,
      stylesheets = []
    } = this.props

    return (
      <head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <CSS />
        {stylesheets.map(href => (
          <link
            key={href}
            rel='stylesheet'
            href={href}
          />
        ))}
      </head>
    )
  }
}

const CSS = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
CSS.defaultProps = {
  css: '*{box-sizing:border-box}body{margin:0}'
}

export default Head
