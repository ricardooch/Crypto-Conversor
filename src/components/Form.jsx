import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { monedas } from '../data/currencies'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setMonedas}) => {
    const [ criptos, setCriptos ] = useState([''])
    const [ error, setError ] = useState(false)

    const [ currency, SelectCurrency ] = useSelectCurrency('Elige tu moneda', monedas)
    const [ cripto, SelectCripto ] = useSelectCurrency('Elige tu criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCriptos)
        }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        
        if([currency, cripto].includes('')) {
            setError(true)

            return
        }

        setError(false)
        setMonedas({
            currency,
            cripto
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios </Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrency />
                <SelectCripto />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Form