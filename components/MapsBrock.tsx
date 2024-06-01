import React from 'react'

const MapsBrock = () => {
{/* <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style */}

    // <style>.mapouter{position:relative;text-align:right;height:500px;width:600px}</style>
  return (
    <div>

        <div className="mt-[100px]">
            <div className="overflow-hidden bg-none">
                <iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Rua%20Joaquim%20Floriano,%2072%20-%20conj.%20141%20e%20142%E2%80%A8Parte%20Edif.%20Sao%20Paulo%20Head%20Offices%20&t=&z=15&ie=UTF8&iwloc=&output=embed" >
                </iframe>
            </div>
        </div>
      
    </div>
  )
}

export default MapsBrock
