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
    const text = fun.length > 0 ? fun : 'Write your text in the text input field'
    return (
      <div className='row'>
        <div className='col-sm-offset-3 col-sm-6'>
          <div className='form-group'>
            <div className='jumbotron'>{text}</div>
            <input type='text' value={fun} onChange={::this.updateField} className='form-control'
              placeholder='Write your text here' />
          </div>
        </div>
      </div>
    )
  }
}
export default Fun
