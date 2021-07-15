function Character({ character }) {

    return (
        <div className="char">
            <p>Name: { character.name }</p>
            <p>Type: { character.type }</p>
            <p>Chance: { character.chance }</p>
        </div>
    )

}

export default Character;