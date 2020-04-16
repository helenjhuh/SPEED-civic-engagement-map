import React from 'react';

const Dimmer = props => {
    const { open } = props;
    if (open) {
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgb(0,0,0)',
                    opacity: 0.6,
                    zIndex: 5000,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'opacity 0.15s'
                }}
            />
        );
    }
    return null;
};

export default Dimmer;
