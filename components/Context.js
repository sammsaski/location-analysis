/**
 * Establish context to work-around hooks not being usable in custom-class components.
 */

import React from 'react';

const CameraContext = React.createContext();

export default CameraContext;

