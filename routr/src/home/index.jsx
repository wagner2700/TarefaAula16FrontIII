import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import axios from "axios";


export default function HomePage(){

    const navigate = useNavigate()
    const [nomes , setNomes] = useState([]);


        const[formNome , setFormNome] = useState("")
        const [formMatricula , setFormMatricula] = useState("")
        const [formCurso , setFormCurso] = useState("")
        const [formBimestre , setFormBimestre] = useState("")

    async function getNomes(){ 
        try{
            const response = await axios.get("https://api-aluno.vercel.app/aluno")
            setNomes(response.data)
            console.log(response)
            
        }catch(error){
            alert("Erro ao buscar dados")
        }
    }

    useEffect(()=>{
        getNomes()
    }, [])

    async function addItem(event){
        
        event.preventDefault();
        //POST


        await axios.post("https://api-aluno.vercel.app/aluno" , {
            nome: formNome,
            matricula: formMatricula,
            curso: formCurso,
            bimestre: formBimestre
        })

        
        getNomes()
    }

    return (
        <div>
            <h1>
                Lista de Alunos
            </h1>
            
            <form onSubmit={addItem}>
                <input type="text" placeholder="Digite Nome" value={formNome} onChange={(event)=>setFormNome(event.target.value)} /> <br />

                <input type="text" placeholder="Digite Matricula" value={formMatricula} onChange={(event)=>setFormMatricula(event.target.value)} /><br />

                <input type="text" placeholder="Digite Curso" value={formCurso} onChange={(event)=>setFormCurso(event.target.value)} /><br />

                <input type="text" placeholder="Digite Matricula" value={formBimestre} onChange={(event)=>setFormBimestre(event.target.value)} /><br />

                <input type="submit"  />
            </form>

            <ul>{nomes.map((nome)=>(
                <div>
                    <h3>
                        {nome.nome}
                    </h3>
                    <p>
                        {nome.matricula}
                    </p>
                    <p>
                        {nome.curso} - {nome.bimestre} bimestre
                    </p>
                </div>
                ))}
            </ul>

            <button onClick={()=>navigate("/dashboard")}>Ir para formulário</button>
             
           
        </div>
    )
}