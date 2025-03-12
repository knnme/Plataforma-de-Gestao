import React, {useEffect, useState} from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

function Clientes() {
    const [clientes, setClientes] = useState([])
    const [editando, setEditando] = useState(null)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    //Buscar clientes da API
    useEffect(() => {
        carregarClientes()   
    }, [])

    const carregarClientes = async () => {
        try {
            const response = await api.get('/clientes')
            setClientes(response.data)
        } catch (error) {
            console.error("Erro ao buscar clientes:", error)
        }
    }

    //Função para cadastrar um novo cliente
    const cadastrarCliente = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post ('/clientes', {nome, email, telefone })
            setClientes([...clientes, response.data]) //Atualiza a lista
            setNome('')
            setEmail('')
            setTelefone('')
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error)
        }
    }

    //Função para editar cliente
    const iniciarEdicao = (cliente) => {
        setEditando(cliente._id)
        setNome(cliente.nome)
        setEmail(cliente.email)
        setTelefone(cliente.telefone)
    }

    const salvarEdicao = async (id) => {
        try {
            await api.put(`/clientes/${id}`, {nome, email, telefone})
            setEditando(null)
            carregarClientes()
        } catch (error) {
            console.error("Erro ao atualizar cliente", error)
        }
    }

    //Excluir cliente
    const excluirCliente = async (id) => {
        try {
            await api.delete(`/clientes/${id}`)
            setClientes(clientes.filter(cliente => cliente._id !== id))
        } catch (error) {
            console.error("Erro ao excluir cliente", error)
        }
    }

    return (
        <div>
            <h1>Lista de Clientes</h1>

            {/*Formulário de Cadastri*/}
            <form onSubmit={cadastrarCliente}>
                <input
                    type='text'
                    placeholder='Nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Telefone'
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                <button type='submit'>Cadastrar</button>
            </form>

            {/* Lista de Clientes */}
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente._id}>
                        {editando === cliente._id ? (
                            <>
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                <button onClick={() => salvarEdicao(cliente._id)}>Salvar</button>
                                <button onClick={() => setEditando(null)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                {cliente.nome} - {cliente.email}
                                <button onClick={() => iniciarEdicao(cliente)}>Editar</button>
                                <button onClick={() => excluirCliente(cliente._id)}>Excluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <h3><Link to='/'>Voltar</Link></h3>
            </div>
        </div>
    )
}

export default Clientes