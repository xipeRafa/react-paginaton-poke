import { useState, useEffect } from 'react';

import { fetchAllPokemons } from '../helpers/fetchAllPokemons';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';


export const usePokemon = () => {
    
    const [ isLoading, setisLoading ] = useState<boolean>(true);
    const [ pokemons, setPokemons ] = useState<Pokemon[]>([])

    console.log(pokemons)

    useEffect(() => {
        fetchAllPokemons().then( pokemons => {
            setisLoading(false);
            setPokemons( pokemons );
        })
    }, [])

    return { isLoading, pokemons }
}
