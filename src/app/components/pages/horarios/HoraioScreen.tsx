import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import { i_horarios, i_h_consulta } from '../../../intefaces/horariosInteface';
import moment from 'moment';
import TimeKeeper from 'react-timekeeper';
import { useDispatch, useSelector } from 'react-redux';
import { startingGetHorarios } from '../../../actions/horarios';
import i_redux from '../../../intefaces/reduxInterface';
import Loading from '../../ui/loading';
import { startLoading } from '../../../actions/ui';

import jsPDF from 'jspdf';
import { startingSetPdf } from '../../../actions/pdf';
import autoTable from 'jspdf-autotable';
import ModalPDF from '../../ui/reporte';
/* import ReactExport from "react-data-export";   */

/* const ExcelFile =ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelSheet;
const ExcelColumn= ReactExport.ExcelColumn;  
 */




const Afluencia = () => {


    const date = moment().hour(0).minute(0).second(0);

    const dispatch = useDispatch();
    const { horarios: { horarios }, ui: { loading } } = useSelector((info: i_redux) => info);
    console.log(horarios)


    const init: i_h_consulta = {
        nombredia: 'Lunes',
        horaentrata: date.hour(5).format('H:mm'),
        horasalida: date.hour(5).format('H:mm'),
    }

    const [showTimeStart, setShowTimeStart] = useState(false);
    const [showTimeEnd, setShowTimeEnd] = useState(false);

    const [horaentrata, setHoraEntrada] = useState(init.horaentrata);
    const [horasalida, setHoraSalida] = useState(init.horasalida);

    const [values, handleInputChange] = useForm(init);
    const { nombredia } = values;

    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        values.horaentrata = horaentrata;
        values.horasalida = horasalida;
        dispatch(startingGetHorarios(values));
        dispatch(startLoading());
    }

   const handlePrint = async () => {

        const doc = new jsPDF()
        doc.setProperties({ title: 'Rango Consulta Horarios' })

        doc.setFontSize(10);
        doc.text(70, 6, 'Servicio de Transporte Escolar E Institucional')
        doc.setFontSize(10);
        doc.text(80, 10, 'Universidad Técnica del Norte')
        doc.setFontSize(10);
        doc.text(73, 14, 'LISTA POR RANGO DE CONSULTA')
        autoTable(doc, {
            head: [[
                'Cedula Estudiante',
                'Dia de la Semana',
                'Hora de Entrada',
                'Hora de Salida'


            ]],
            body: horarios?.map((hora: i_horarios) => [
                hora.cedula_estudiante,
                hora.nombredia,
                hora.horaentrata,
                hora.horasalida


            ])
        })

        const urlString = doc.output('datauristring');
        dispatch(startingSetPdf(urlString))
    } 

    /* const horarioexcel=[
        {
            cedula: horarios?.map((hora: i_horarios) => [
                hora.cedula_estudiante
            ])
        },
        {
            dia: horarios?.map((hora: i_horarios) => [
                hora.nombredia
            ])
        },
        
        {
            ent: horarios?.map((hora: i_horarios) => [
                hora.horaentrata
            ])
        },
        {
            sal: horarios?.map((hora: i_horarios) => [
                hora.horasalida
            ])
        }
    ]
 */
    return <>
     
        <form onSubmit={handleSubmit as any}>
            <div className='mb-3'>
                <h3 className="text-center">Afluencia</h3>
                <h5 className="">Seleccione los filtros</h5>
                <hr className="my-3" />
                <h6>Dia de la semana:</h6>
                <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" name='nombredia' value={nombredia} onChange={handleInputChange}>
                    {
                        dias.map((dia: any) => (
                            <option key={dia} value={dia}> {dia}</option>
                        ))
                    }
                </select>
            </div>
            <div className='mb-3'>
                <button type='button' className="btn btn-outline-secondary btn-lg" onClick={() => setShowTimeStart(!showTimeStart)}>Hora Entrada</button>
                {
                    showTimeStart && <TimeKeeper
                        time={horaentrata}
                        onChange={(newTime) => setHoraEntrada(newTime.formatted24)}
                        hour24Mode={true}
                    />
                }
            </div>
            <div className='mb-3'>
                <button type='button' className="btn btn-outline-secondary btn-lg" onClick={() => setShowTimeEnd(!showTimeEnd)}>Hora Salida</button>
                {
                    showTimeEnd && <TimeKeeper
                        time={horasalida}
                        onChange={(newTime) => setHoraSalida(newTime.formatted24)}
                        hour24Mode={true}
                    />
                }
            </div>
            <button type="submit" className="btn btn-warning btn-lg">Consultar</button>
        </form>
        <br /><br />

        <button className="btn btn-info" onClick={handlePrint}>Descargar Listado en PDF</button> 
        <br /><br />

 {/*        <ExcelFile element={<button>Exportar a Excel</button>} filename="Excel">
            <ExcelSheet data={horarioexcel} name="Horarios por Rangos" >
<ExcelColumn  label ="Cedula Estudiante" value="cedula"/>
            </ExcelSheet>
       
        </ExcelFile>


        <br /><br /> */}

        
        {
            loading
                ? <Loading type='spin' color='#48f542' />
                : <pre>


                    <div className="col-2"><strong><h5>Listado</h5> </strong> </div>
                    <table id="tblData" className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Cedula Estudiante</th>
                                <th scope="col">Dia de la Semana</th>
                                <th scope="col">Hora de Entrada</th>
                                <th scope="col">Hora de Salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                    {
                                        (horarios && horarios.length >= 1)
                                            ? horarios.map((hora: i_horarios, key: number) =>
                                                <pre>{hora.cedula_estudiante}</pre>)
                                            : <div>No Existe Datos </div>
                                    }

                                </td>
                                <td>
                                    {
                                        (horarios && horarios.length >= 1)
                                            ? horarios.map((hora: i_horarios, key: number) =>
                                                <pre>{hora.nombredia}</pre>)
                                            : <div>No Existe Datos </div>
                                    }

                                </td>
                                <td>
                                    {
                                        (horarios && horarios.length >= 1)
                                            ? horarios.map((hora: i_horarios, key: number) =>
                                                <pre >{hora.horaentrata}</pre>)
                                            : <div>No Existe Datos </div>
                                    }

                                </td>
                                <td>
                                    {
                                        (horarios && horarios.length >= 1)
                                            ? horarios.map((hora: i_horarios, key: number) =>
                                                <pre >{hora.horasalida}</pre>)
                                            : <div>No Existe Datos </div>
                                    }

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </pre>

        }

        <ModalPDF />



    </>
}


export default Afluencia;