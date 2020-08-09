import React, {useState, FormEvent} from 'react'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'


function TeacherForm() {
    const history = useHistory()

    const [scheduleItens,setScheduleItens] = useState(
        [
            { week_day:0, from:"", to:"" }
        ]
    )

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    function addScheduleItem(){
        setScheduleItens([
            ...scheduleItens,
            { week_day:0, from:"", to:"" }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItens = scheduleItens.map((scheduleItem, index)=> {
            if(index === position) {
                return {...scheduleItem, [field]:value};
            }
            return scheduleItem;
        })
        setScheduleItens(updatedScheduleItens)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(()=>{
            alert('Cadastro realizado com sucesso.')
            history.push("/")
        }).catch(()=>{
            alert('Erro no cadastro')
        })
        console.log({name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                scheduleItens})
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas"
                        description="O primeiro passo, é preencher esse formulario de inscrição"/>
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input label="Nome completo" name="name" value={name} onChange={(event)=>{setName(event.target.value)}} />
                        <Input label="Avatar" name="avatar" value={avatar} onChange={(event)=>{setAvatar(event.target.value)}}/>
                        <Input  label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(event)=>setWhatsapp(event.target.value)}/>
                        <Textarea label="Biografia" name="bio" value={bio} onChange={(event)=>{setBio(event.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                                label="Matérial"
                                name="subject"
                                value={subject}
                                onChange={(e)=>{setSubject(e.target.value)}}
                                options={
                                    [
                                        {value: "Artes", label:"Artes"},
                                        {value: "Biologia", label:"Biologia"},
                                        {value: "Matematica", label:"Matematica"},
                                        {value: "Ed. Fisica", label:"Ed. Fisica"},
                                        {value: "Portugues", label:"Portugues"},
                                        {value: "Historia", label:"Historia"},
                                        {value: "Geografia", label:"Geografia"}
                                    ]
                                }
                            />
                        <Input label="Custo da sua hora por aula" name="cost" value={cost} onChange={(e)=>{setCost(e.target.value)}}/>
                    </fieldset>

                    <fieldset>
                        <legend>Horarios disponiveis
                            <button type="button" onClick={addScheduleItem}>+ novo horario</button>
                        </legend>
                        {scheduleItens.map((scheduleItem, index)=>{
                            return (
                                <div key={index} className="schedule-item">
                                    <Select 
                                        label="Dia da semana"
                                        name="week-day"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={
                                            [
                                                {value: "0", label:"Domingo"},
                                                {value: "1", label:"Segunda-feira"},
                                                {value: "2", label:"Terça-feira"},
                                                {value: "3", label:"Quarta-feira"},
                                                {value: "4", label:"Quinta-feira"},
                                                {value: "5", label:"Sexta-feira"},
                                                {value: "6", label:"Sabado"}
                                            ]
                                        }
                                    />
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                </div>             
                            );
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso inportante"/>
                            Importante <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>            
        </div>
    )
}

export default TeacherForm