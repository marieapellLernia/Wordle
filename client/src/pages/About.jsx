function About() {
    return (
        <div>
            <h1>Om projektet</h1>
            <p>
                Spelet går ut på att gissa ett hemligt ord. Efter varje gissning
                får spelaren feedback:
            </p>

            <ul>
                <li>Grön = rätt bokstav på rätt plats</li>
                <li>Gul = rätt bokstav på fel plats</li>
                <li>Röd = bokstaven finns inte</li>
            </ul>
        </div>
    );
}

export default About;