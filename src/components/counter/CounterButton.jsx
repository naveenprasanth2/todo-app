import { PropTypes } from 'prop-types'
import './Counter.css'


export default function CounterButton({ by, incrementMethod, decrementMethod }) {

    return (
        <>
            <div>
                <button className="counterButton"
                    onClick={() => incrementMethod(by)}
                >+{by}</button>
                <button className="counterButton"
                    onClick={() => decrementMethod(by)}
                >-{by}</button>
            </div>
        </>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}