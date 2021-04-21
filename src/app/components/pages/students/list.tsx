import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i_redux from '../../../intefaces/reduxInterface';
import { i_student } from '../../../intefaces/studentInterface';
import jsPDF from 'jspdf';
import { startingSetPdf } from '../../../actions/pdf';
import autoTable from 'jspdf-autotable'
import ModalPDF from '../../ui/reporte';
import { setActiveStudent } from '../../../actions/students';
import { Link } from 'react-router-dom';

const ListStudents = () => {

    const dispatch = useDispatch();

    const { students } = useSelector((info: i_redux) => info.student)
    console.log(students)

    const handlePrint = async () => {

        const doc = new jsPDF()
        doc.setProperties({ title: 'ListaEstudiante' })
        doc.setFontSize(10);
        doc.text(70, 6, 'Servicio de Transporte Escolar E Institucional')
        doc.setFontSize(10);
        doc.text(80, 10, 'Universidad Técnica del Norte')
        doc.setFontSize(10);
        doc.text(22, 14, 'LISTA CONSOLIDADA DE ESTUDIANTES Y PERSONAL QUE UTILIZA EL SERVICIO DE TRANSPORTE')
        autoTable(doc, {
            head: [[
                'Cedula',
                'Apellido',
                'Nombre',
                'Facultad',
                'Origen'
                
            ]],
            body: students?.map((student: i_student) => [
                student.cedula_estudiante,
                student.apellido_estudiante,
                student.nombre_estudiante, 
                student.facultade.nombre,
                student.ciudad.nombre
                
            ])
        })

        const urlString = doc.output('datauristring');
        dispatch(startingSetPdf(urlString))
    }

    const handleSearch = (student: i_student) => {
        dispatch(setActiveStudent(student))
    }


    return <>
        <button className="btn btn-info" onClick={handlePrint}>Descargar Listado en PDF</button>
        <table id='mytable' className="table table-striped table-hover table-sm ">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cedula</th>
                    <th>Semestre</th>
                    <th>Ciudad</th>
                    <th>Facultad</th>
        {/*   <th>Carrera</th>  */}
                    <th>Opcion: Busqueda</th>
                </tr>
            </thead>
            <tbody>
                {students?.map((student: i_student) => <tr key={student.cedula_estudiante}>
                    <td>{student.nombre_estudiante}</td>
                    <td>{student.apellido_estudiante}</td>
                    <td>{student.cedula_estudiante}</td>
                    <td>{student.semestre.nombre}</td>
                    <td>{student.ciudad.nombre}</td>
                    <td>{student.facultade.nombre}</td>
                   {/*  <td>{student.carrera.nombre}</td>  */}  

                    <td><Link
                        onClick={() => handleSearch(student)}
                        style={{ cursor: 'pointer', textDecoration: 'none' }}
                        className='fa fa-search'
                        to='/students/student'
                    ></Link></td>
                </tr>)}
            </tbody>
        </table>

        <ModalPDF />
    </>

}


export default ListStudents;