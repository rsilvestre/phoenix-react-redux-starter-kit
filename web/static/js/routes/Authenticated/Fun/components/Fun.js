import React from 'react'

export class Fun extends React.Component {
  static propTypes = {
    fun: React.PropTypes.string.isRequired,
    updateField: React.PropTypes.func.isRequired
  }

  updateField (e) {
    const {updateField} = this.props
    updateField(e.target.value)
  }

  render () {
    const { fun } = this.props
    return (<div style={{ margin: '0 auto' }}>
        <div>{fun}</div>
        <input type='text' value={fun} onChange={::this.updateField}/>
      </div>
    )
  }
}
export default Fun
