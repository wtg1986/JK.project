import { Animated, Easing } from 'react-native';
import { store } from '../App';

export const anim = (toValue, duration, next) => {
    let toastTop = store.getState().toastTop
    return  Animated.timing(toastTop, {
                easing: Easing.easeOutElastic,
                duration: 300,
                toValue: toValue
            }).start(() => {
                setTimeout(() => {
                    next && next()
                },duration)
            })
};