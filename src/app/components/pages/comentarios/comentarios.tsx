import React, { useEffect,Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingStudents } from '../../../actions/students';
import { startLoading } from '../../../actions/ui';
import i_redux from '../../../intefaces/reduxInterface';
import Loading from '../../ui/loading';

import axios from 'axios';

const Comentario = () => {

 

    const dispatch = useDispatch();
    const { loading } = useSelector((info: i_redux) => info.ui);

    useEffect(() => {
        dispatch(startLoading());
    }, [dispatch])




    return <>
        {
            loading
                ? <Loading type='spin' color='#48f542' />
                : <div>
                    <h3 className="text-center">Comentarios</h3>
                    <hr className="my-3" />
          

                </div>
        }
    </>
}

export default Comentario;