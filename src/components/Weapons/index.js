import React from "react";
import Weapon from "./Weapon";
import "./style.css";

/**
    Functional component Weapons, iterate list of weapons
*/
const Weapons = (props) => {
    const { gameState, onWeaponSelected } = props;

    /**
     *  Trigger context action on weapon selection and populate winner
     * @param weapon, user selected weapon
     * @param e, event object to prevent default action
     */
    const weaponSelected = (weapon, e) => {
        e.preventDefault();
        onWeaponSelected(weapon);
    }

    return (
        <div className="weapons-section flex-row content-at-center">
            <div className="display-flex weapons-flex-flow">
                {gameState.gameMode.weaponList.length > 0 && gameState.gameMode.weaponList.map((weapon, ind) => {
                    return <Weapon key={`${weapon}-${ind}`}
                        weapon={weapon}
                        weaponSelectionHandler={weaponSelected} ></Weapon>
                })}
            </div>
        </div >
    )
};

export default React.memo(Weapons);