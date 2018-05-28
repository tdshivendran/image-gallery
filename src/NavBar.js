import React from 'react';

class NavBar extends React.Component {
    render() {
        return(
            <div>
                <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" id="Nav-link" href="#">Animal Image Gallery</a>
                    <button id="submitPhote" class="btn btn-outline-success justify-content-left" type="button">Submit Photo</button>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar