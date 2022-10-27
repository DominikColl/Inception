import { Text,Html,PresentationControls,Float,Environment,useGLTF, ContactShadows } from '@react-three/drei'
import { useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {useControls} from 'leva'

import * as THREE from 'three'

export default function Experience()
{
    // debugger
    // 0,0.55,-1.15
    const {positionX}=useControls({positionX:0})
    const {positionZ}=useControls({positionZ:0.55})
    const {positionY}=useControls({positionY:-1.15})
    // console.log(controls.position)
    // macbook model
    const computer=useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
//    animate camera
const [clicked,setClicked]= useState(false)
const markerRef=useRef()
const vec=new THREE.Vector3()

useFrame(state=>{
    if(clicked){
        state.camera.lookAt(markerRef.current.position)
        // state.camera.position.lerp(vec.set(xPosition,yPosition,zPosition))
        state.camera.position.lerp(vec.set(1,0.25,0.25))
        state.camera.updateProjectionMatrix()
    }
    return null
})
   return <>
    <Environment preset='city'/>

        <color args={['#695b5b']} attach="background"/>
        <mesh>
       
        </mesh>
        <PresentationControls
        global
        rotation={[.13,.1,0]}
        polar={[-0.4,0.2]}
        // azimuth={[-1,0.75]}
        config={{mass:2,tension:400}}
        snap={{mass:4,tension:400}}

        >
        <Float rotationIntensity={0.4}>
            {/* light coming from laptop screen */}
            <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[0.1,0.55,-1.15]}
            position={[positionX,positionZ,positionY]}
            />
    <primitive 
    object={computer.scene}
    position-y={-1.2 }
    >
        <Html
        transform
        wrapperClass='htmlScreen'
        distanceFactor={1.17}
        position={[0,1.56,-1.4]}
        rotation-x={-0.256}
        >
            {/* <iframe src='https://www.dominikcoll.com/'/> */}
            <iframe src='https://issnationallab-theinfinite.com/'/>
        </Html>
    </primitive>
    <Text 
    font="./bangers-v20-latin-regular.woff"
    fontSize={1}
    position={[2,0.75,0.75]}
    rotation-y={-1.25}
    maxWidth={2}
    textAlign='center'
    ref={markerRef}
    onClick={()=>setClicked(!clicked)}
    >DOMINIK COLL</Text>
    </Float>
    </PresentationControls>
    <ContactShadows 
    position-y={-1.4}
    opacity={0.4}
    scale={5}
    blur={2.4}
    />
    </>
}