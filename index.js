import { Suspense } from 'react'
import { render } from 'react-dom'
import { useLoader, Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import './App.css';


 


const Model = ({ url, ...rest }) => {
  // Can also use useLoader(GLTFLoader, url)
  // But Drei will configure a few things OOTB for you
  // which makes it handy
  const { scene } = useGLTF(url)

  return <primitive {...rest} object={scene} />
}

render(
  <Canvas
    dpr={[1, 2]}
    gl={{ physicallyCorrectLights: true }}
    camera={{ position: [10, 30, 20], fov: 70 }}
  >
    <color attach="background" args={[0xe2f4df]} />
    <ambientLight />
    <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
    <directionalLight intensity={0.8} position={[-6, 2, 2]} />
    <OrbitControls
      enablePan={false}
      enableZoom={true}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />
    <Suspense fallback={null}>
      <Environment preset="park" />
      <Model scale={1.2} url="/Human.glb" />
    </Suspense>
  </Canvas>,
  document.getElementById('root')
)
