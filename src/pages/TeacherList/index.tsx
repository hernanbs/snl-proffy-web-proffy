import React, { useState, FormEvent } from 'react'
import './styles.css'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'


function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const response = await api.get('classes',{
            params: {
                subject,
                week_day,
                time
            }
        })
        console.log(response.data)
        setTeachers(response.data)
    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        label="Matérial"
                        name="subject"
                        value={subject}
                        onChange={e => {setSubject(e.target.value)}}
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
                    <Select 
                        label="Dia da semana"
                        name="week-day"
                        value={week_day}
                        onChange={e => {setWeekDay(e.target.value)}}
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
                    <Input type="time" label="hora" name="time" value={time} 
                            onChange={e => {
                                    setTime(e.target.value)
                                }
                            }/>
                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}

            </main>
        </div>
    )
}

export default TeacherList