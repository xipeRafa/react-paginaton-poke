import { useState, ChangeEvent } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';

export const HomePage = () => {

    const { isLoading, pokemons } = usePokemon();

    const [ currentPage, setCurrentPage ] = useState(0)
    const [ search, setSearch ] = useState('');

    let PPP = 8

    const filteredPokemons = (): Pokemon[] => {
        if( search.length === 0 ) return pokemons.slice(currentPage, currentPage + PPP);

        const filtered = pokemons.filter( poke => poke.name.includes( search ) );
        return filtered.slice( currentPage, currentPage + PPP);
    }

    
    const nextPage = () => {
        if ( pokemons.filter( poke => poke.name.includes( search ) ).length > currentPage + PPP )
            setCurrentPage( currentPage + PPP );
    }

    const prevPage = () => {
        if ( currentPage > 0 ) setCurrentPage( currentPage - PPP );
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch( target.value );
    }


    return (
        <div className="mt-5">
            
            <h1>Listado de Pokémons</h1>
            <hr/>

            <input className="mb-2 form-control" value={search} onChange={onSearchChange}/>

            <button className="btn btn-primary" onClick={ prevPage }>
                Anteriores
            </button>
            <button className="btn btn-primary" onClick={ nextPage }>
                Siguientes
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 100 }}>ID</th>
                        <th style={{ width: 150 }}>Nombre</th>
                        <th  style={{ width: 150 }}>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPokemons().map( ({ id, name, pic }) => (
                        <tr key={ id }>
                            <td> { id } </td>
                            <td> { name } </td>
                            <td> <img src={ pic } alt={ name } style={{ height: 88 }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {isLoading &&   
                <div className="alert alert-info">
                    <p>Cargando...</p>
                </div>
            }

        </div>
    )
}
