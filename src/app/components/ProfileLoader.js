import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authActions, {MOCK_USER_AUTH} from "../actions/user";
import {useDispatch} from "react-redux";

const instance = axios.create();

instance.defaults.withCredentials = true;

const ProfileLoader = ({ onUnauthorized }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('http://videogames-load-balancer-1719973211.eu-north-1.elb.amazonaws.com/api/profile');
                console.log(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    onUnauthorized();
                } else {
                    console.error('Error loading profile:', error);
                }
            }
        };

        fetchData();
    }, [navigate, onUnauthorized]);

    return null; // Компонент не відображає нічого
};

export default ProfileLoader;
