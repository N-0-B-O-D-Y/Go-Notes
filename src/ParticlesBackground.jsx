import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadAll} from "@tsparticles/all";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    // Initialize tsParticles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine); // Load slim bundle
        }).then(() => {
            setInit(true); // Set initialization flag
        });
    }, []);

    // Log when particles are loaded (optional)
    const particlesLoaded = (container) => {
        console.log("Particles loaded:", container);
    };

    // Render the Particles component only after initialization
    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            // onClick: {
                            //     enable: true,
                            //     mode: "push", // Add particles on click
                            // },
                            onHover: {
                                enable: false,
                                mode: "repulse", // Repulse particles on hover
                            },
                            resize: true,
                        },
                        modes: {
                            // push: {
                            //     quantity: 6, // Number of particles to add on click
                            // },
                            repulse: {
                                distance: 200, // Repulse distance
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        // color: {
                        //     value: ["#008cff", "#7b64f6", "rgba(0, 230, 204, 0.8)"], // Particle color
                        // },
                        links: {
                            color: {
                                value: ["#7b64f6"],
                            }, // Line color
                            distance: 250,
                            enable: true,
                            opacity: 0.5,
                            width: 2,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce", // Bounce particles off edges
                            },
                            random: true,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 900,
                            },
                            value: 150, // Number of particles
                        },
                        opacity: {
                            value: 0.8,
                        },
                        shape: {
                            type: "", // Particle shape
                        },
                        size: {
                            value: { min: 4, max: 6 }, // Particle size range
                        },
                    },
                    detectRetina: true, // Optimize for high-resolution displays
                }}
            />
        );
    }

    return null; // Return null until initialized
};

export default ParticlesBackground;