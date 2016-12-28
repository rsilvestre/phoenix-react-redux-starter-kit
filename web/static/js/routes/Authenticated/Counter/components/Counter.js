import React from 'react'

export class Counter extends React.Component {
  componentDidMount () {
    const { socket, connectToChannel } = this.props

    connectToChannel(socket)
  }

  componentWillUpdate () {
    const { socket, connectToChannel } = this.props

    connectToChannel(socket)
  }

  componentWillUnmount () {
    this.props.leaveChannel()
  }

  render () {
    const { counter, increment, doubleAsync } = this.props
    return (
      <div style={{ margin: '0 auto' }}>
        <h2>Counter: {counter}</h2>
        <button className='btn btn-default' onClick={increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
  socket: React.PropTypes.object,
  connectToChannel: React.PropTypes.func.isRequired,
  leaveChannel: React.PropTypes.func.isRequired
}

export default Counter
