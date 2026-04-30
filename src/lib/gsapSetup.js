/**
 * gsapSetup.js
 *
 * Central GSAP plugin registration.
 * Imported once in main.jsx as a side-effect so every component
 * can use the plugins without re-registering them.
 */

import gsap from 'gsap'
import { ScrollTrigger, SplitText, TextPlugin, Observer, Flip } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, Observer, Flip)

export { gsap, ScrollTrigger, SplitText, TextPlugin, Observer, Flip }
