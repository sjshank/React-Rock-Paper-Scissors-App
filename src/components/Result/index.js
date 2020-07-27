import React from 'react';
import propTypes from 'prop-types';
import * as AppConstants from "../../config/appConstant";
import "./style.css";

/**
    Functional component Result, to display result of each action
*/
const Result = (props) => {
    const { gameMode, resultText } = props;

    return (
        <article>
            <div className="result-text" aria-label="result">
                <h6 className="padding-x_small">
                    {gameMode === 'verses' ? (resultText ? resultText : AppConstants.INFO_LABEL) : resultText}
                </h6>
            </div>
        </article>
    )
}
Result.propTypes = {
    gameMode: propTypes.string.isRequired,
};
export default React.memo(Result);