import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <span>
                <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" id="Nav-link" href={process.env.PUBLIC_URL}>Image Gallery
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                            <a href="https://tdshivendran.github.io/aboutme/" target="_blank" id="aboutButton" class="btn btn-outline-secondary" role="button" rel="noopener noreferrer">About Developer</a>
                        </ul>
                    </div>
                </nav>
            </span>
        );
    }
}

export default Navbar;