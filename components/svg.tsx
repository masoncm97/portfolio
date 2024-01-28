import classNames from 'classnames'
import * as React from 'react'
import { SVGProps } from 'react'

interface SVGElementProps {
  props?: SVGProps<SVGSVGElement>
  className?: string
}
export const LogoBlack = ({ props, className }: SVGElementProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    data-name="Layer 2"
    viewBox="0 0 1072.63 373.95"
    {...props}
  >
    <defs>
      <style>{'.cls-1{fill:#231f20;stroke-width:0}'}</style>
    </defs>
    <g id="Layer_1-2" data-name="Layer 1">
      <path
        d="M4.5 8.95h31.69l46.96 138.07L129.78 8.95h31.47v163.31h-21.12V75.87c0-3.34.07-8.86.22-16.56.15-7.71.22-15.97.22-24.79L93.94 172.26H72.02L24.96 34.52v5c0 4 .11 10.1.33 18.29.22 8.19.33 14.21.33 18.07v96.39H4.5V8.95Z"
        className="cls-1"
      />
      <path
        d="M165.75 176.76h-30.12V75.87c0-2.88.05-7.3.16-13.18L97.18 176.76H68.81L29.92 62.97c.13 5.59.2 9.92.2 12.91v100.89H0V4.45h39.42L83.14 133 126.55 4.45h39.2v172.31Zm-21.12-9h12.12V13.45h-11.68v21.07c0 8.77-.08 17.14-.22 24.88-.15 7.57-.22 13.11-.22 16.48v91.89Zm-69.39 0h15.48l52.23-154.31H133L83.16 161.04 32.97 13.45H22.51l52.73 154.31Zm-66.24 0h12.12V75.87c0-3.79-.11-9.83-.33-17.94-.22-8.18-.33-14.37-.33-18.41V13.45H9v154.31ZM255.84 8.95h25.01l59.25 163.31h-24.24l-16.56-48.92h-64.59l-17.68 48.92h-22.68L255.84 8.95Zm36.36 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M346.53 176.76h-33.88l-16.56-48.92h-58.2l-17.68 48.92h-32.34L252.73 4.45h31.28l62.52 172.31Zm-27.43-9h14.59L277.7 13.45h-18.74l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.6-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm140.86 18.73c.5 9.27 2.61 16.79 6.32 22.57 7.07 10.82 19.53 16.23 37.37 16.23 8 0 15.28-1.18 21.85-3.56 12.71-4.59 19.06-12.82 19.06-24.68 0-8.89-2.69-15.23-8.08-19.01-5.46-3.71-14-6.93-25.63-9.67l-21.43-5c-14-3.26-23.91-6.85-29.72-10.78-10.05-6.82-15.08-17.01-15.08-30.57 0-14.67 4.94-26.72 14.82-36.13 9.88-9.41 23.87-14.12 41.98-14.12 16.66 0 30.81 4.13 42.46 12.4 11.65 8.27 17.47 21.47 17.47 39.63h-20.79c-1.07-8.74-3.34-15.45-6.82-20.12-6.47-8.52-17.44-12.78-32.93-12.78-12.51 0-21.5 2.74-26.97 8.23-5.47 5.49-8.21 11.86-8.21 19.12 0 8 3.23 13.86 9.69 17.57 4.24 2.37 13.82 5.34 28.76 8.89l22.19 5.23c10.7 2.52 18.96 5.97 24.77 10.34 10.05 7.63 15.08 18.72 15.08 33.24 0 18.08-6.41 31.02-19.24 38.8-12.83 7.78-27.74 11.67-44.72 11.67-19.81 0-35.31-5.19-46.51-15.56-11.21-10.3-16.7-24.27-16.48-41.91h20.79Z"
        className="cls-1"
      />
      <path
        d="M430.55 181.54c-20.88 0-37.56-5.64-49.57-16.76-12.12-11.14-18.16-26.38-17.92-45.27l.06-4.44h29.5l.23 4.26c.46 8.43 2.34 15.29 5.61 20.38 6.22 9.52 17.21 14.16 33.59 14.16 7.44 0 14.27-1.11 20.32-3.29 10.98-3.97 16.09-10.47 16.09-20.45 0-7.4-2.02-12.42-6.16-15.33-4.92-3.34-13.04-6.37-24.08-8.98l-21.42-5c-14.68-3.42-24.89-7.16-31.22-11.44-11.32-7.68-17.06-19.22-17.06-34.3 0-15.88 5.46-29.14 16.22-39.39C395.44 5.5 410.61.33 429.82.33c17.53 0 32.69 4.45 45.07 13.23 12.85 9.12 19.37 23.69 19.37 43.3v4.5h-29.27l-.48-3.96c-.97-7.92-2.97-13.97-5.96-17.98-5.52-7.27-15.39-10.97-29.33-10.97-11.21 0-19.21 2.32-23.78 6.9-4.64 4.65-6.89 9.86-6.89 15.94 0 6.41 2.36 10.75 7.43 13.66 2.61 1.46 9.54 4.13 27.56 8.42l22.18 5.22c11.26 2.65 20.16 6.39 26.45 11.12 11.2 8.51 16.88 20.9 16.88 36.84 0 19.68-7.2 34.03-21.41 42.65-13.48 8.18-29.31 12.33-47.06 12.33Zm-58.42-57.48c.67 14.3 5.58 25.49 14.95 34.1 10.3 9.54 24.92 14.38 43.47 14.38 16.07 0 30.33-3.71 42.39-11.02 11.49-6.97 17.08-18.4 17.08-34.95 0-13.16-4.35-22.86-13.3-29.66-5.27-3.96-13.04-7.18-23.08-9.54l-22.19-5.23c-15.5-3.69-25.29-6.75-29.93-9.35-7.86-4.51-12-11.93-12-21.49 0-8.46 3.2-15.97 9.52-22.3 6.32-6.34 16.47-9.55 30.15-9.55 16.9 0 29.19 4.9 36.52 14.56 3.39 4.55 5.78 10.7 7.12 18.34h12.28c-.85-14.39-5.93-24.71-15.45-31.46-10.82-7.67-24.23-11.57-39.86-11.57-16.82 0-29.9 4.33-38.87 12.88-9.03 8.61-13.42 19.36-13.42 32.87 0 12.08 4.29 20.87 13.1 26.85 5.32 3.6 14.82 7 28.22 10.12l21.43 5c12.29 2.9 21.16 6.28 27.14 10.33 6.69 4.69 10.05 12.33 10.05 22.73 0 9.56-3.82 22.33-22.03 28.91-7.03 2.54-14.89 3.83-23.38 3.83-19.38 0-33.22-6.15-41.14-18.27-3.54-5.51-5.78-12.4-6.69-20.53h-12.07Zm301.8-91.77c10.82 14.45 16.23 32.94 16.23 55.47 0 24.38-6.19 44.65-18.57 60.81-14.53 18.97-35.24 28.46-62.14 28.46-25.12 0-44.88-8.3-59.25-24.9-12.82-16.01-19.23-36.24-19.23-60.7 0-22.08 5.48-40.98 16.45-56.7C561.5 14.57 582.33 4.49 609.9 4.49s50.17 9.27 64.03 27.79Zm-19.51 104.1c8.71-13.98 13.06-30.06 13.06-48.23 0-19.21-5.02-34.68-15.06-46.4-10.04-11.72-23.77-17.58-41.19-17.58s-30.68 5.81-41.36 17.41c-10.67 11.61-16.01 28.72-16.01 51.35 0 18.1 4.58 33.36 13.73 45.79s23.99 18.64 44.52 18.64 33.59-6.99 42.3-20.97Z"
        className="cls-1"
      />
      <path
        d="M609.45 181.54c-26.37 0-47.45-8.9-62.66-26.46l-.11-.13c-13.42-16.75-20.22-38.12-20.22-63.51 0-22.92 5.81-42.86 17.26-59.27C558.63 10.83 580.89.01 609.89.01s52.95 9.96 67.64 29.6c11.36 15.18 17.13 34.75 17.13 58.17 0 25.28-6.56 46.66-19.49 63.55-15.35 20.05-37.46 30.22-65.72 30.22Zm-55.79-32.29c13.6 15.67 31.85 23.28 55.8 23.28 25.66 0 44.82-8.73 58.57-26.69 11.7-15.28 17.64-34.82 17.64-58.08 0-21.43-5.16-39.19-15.33-52.78-13.08-17.49-32.85-25.99-60.43-25.99s-45.48 9.26-58.79 28.32c-10.38 14.87-15.64 33.08-15.64 54.12 0 23.26 6.12 42.71 18.19 57.82Zm58.46 12.61c-21.94 0-38.14-6.89-48.15-20.47-9.69-13.15-14.61-29.46-14.61-48.45 0-23.68 5.79-41.98 17.2-54.39 11.51-12.52 26.54-18.87 44.67-18.87s33.71 6.44 44.61 19.15c10.71 12.5 16.15 29.1 16.15 49.32 0 18.94-4.62 35.97-13.74 50.61-9.54 15.32-25.06 23.09-46.12 23.09Zm-.89-133.18c-15.73 0-28.17 5.22-38.04 15.96-9.83 10.7-14.82 26.95-14.82 48.3 0 17.04 4.32 31.54 12.85 43.12 8.33 11.31 21.71 16.81 40.9 16.81 17.99 0 30.58-6.17 38.48-18.85l3.82 2.38-3.82-2.38c8.22-13.19 12.38-28.62 12.38-45.85S658.28 55.53 649 44.7c-9.23-10.77-21.59-16.01-37.77-16.01ZM730.17 8.95h26.06l81.44 131.95V8.95h21.12v163.31h-24.85L751.29 40.47v131.79h-21.12V8.95Z"
        className="cls-1"
      />
      <path
        d="M863.3 176.76h-31.84L755.8 56.11v120.65h-30.12V4.45h33.07l74.43 120.59V4.45h30.12v172.31Zm-26.87-9h17.86V13.45h-12.12v143.31L753.72 13.45h-19.05v154.31h12.12V24.82l89.64 142.94Zm-644.6 38.38h31.69l46.96 138.07 46.63-138.07h31.47v163.31h-21.12v-96.39c0-3.34.07-8.86.22-16.56.15-7.71.22-15.97.22-24.79l-46.63 137.74h-21.92l-47.07-137.74v5c0 4 .11 10.1.33 18.29.22 8.19.33 14.21.33 18.07v96.39h-21.12V206.15Z"
        className="cls-1"
      />
      <path
        d="M353.08 373.95h-30.12V273.06c0-2.87.05-7.3.16-13.18l-38.61 114.07h-28.37l-38.89-113.79c.13 5.59.2 9.92.2 12.91v100.89h-30.12V201.65h39.42l43.72 128.55 43.41-128.55h39.2v172.31Zm-21.12-9h12.12V210.64H332.4v21.07c0 8.78-.08 17.15-.22 24.88-.15 7.58-.22 13.12-.22 16.48v91.89Zm-69.38 0h15.48l52.23-154.31h-9.95L270.5 358.23l-50.2-147.59h-10.46l52.73 154.31Zm-66.25 0h12.12v-91.89c0-3.79-.11-9.83-.33-17.94-.22-8.18-.33-14.37-.33-18.41v-26.07h-11.46v154.31Zm246.85-158.81h25.01l59.25 163.31H503.2l-16.56-48.92h-64.59l-17.68 48.92h-22.68l61.48-163.31Zm36.35 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M533.86 373.95h-33.88l-16.56-48.92h-58.2l-17.68 48.92H375.2l64.87-172.31h31.28l62.52 172.31Zm-27.42-9h14.59l-55.99-154.31H446.3l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.61-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm228.35-91.88v19.45h-55.03v143.86h-22.35V225.59h-55.03v-19.45h132.4Z"
        className="cls-1"
      />
      <path
        d="M612.64 373.95h-31.35V230.09h-55.03v-28.46h141.4v28.46h-55.03v143.86Zm-22.35-9h13.35V221.09h55.03v-10.46h-123.4v10.46h55.03v143.86Zm107.44-158.81h22.35v67.48h83.93v-67.48h22.35v163.31h-22.35v-76.37h-83.93v76.37h-22.35V206.14Z"
        className="cls-1"
      />
      <path
        d="M830.86 373.95h-31.34v-76.38h-74.93v76.38h-31.34V201.64h31.34v67.48h74.93v-67.48h31.34v172.31Zm-22.35-9h13.34V210.64h-13.34v67.48h-92.93v-67.48h-13.34v154.31h13.34v-76.38h92.93v76.38Zm114.22-158.81h25.01l59.25 163.31h-24.24l-16.56-48.92H901.6l-17.68 48.92h-22.68l61.48-163.31Zm36.35 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M1013.42 373.95h-33.88l-16.56-48.92h-58.2l-17.68 48.92h-32.34l64.87-172.31h31.28l62.52 172.31Zm-27.43-9h14.59l-55.99-154.31h-18.75l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.6-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm131.4-91.88h22.35v163.31h-22.35V206.14Z"
        className="cls-1"
      />
      <path
        d="M1072.63 373.95h-31.35V201.64h31.35v172.31Zm-22.35-9h13.35V210.64h-13.35v154.31Z"
        className="cls-1"
      />
    </g>
  </svg>
)

export const LogoWhite = ({ props, className }: SVGElementProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    data-name="Layer 2"
    viewBox="0 0 1072.63 373.95"
    {...props}
  >
    <defs>
      <style>{'.cls-1{fill:#fff;stroke-width:0}'}</style>
    </defs>
    <g id="Layer_1-2" data-name="Layer 1">
      <path
        d="M4.5 8.95h31.69l46.96 138.07L129.78 8.95h31.47v163.31h-21.12V75.87c0-3.34.07-8.86.22-16.56.15-7.71.22-15.97.22-24.79L93.94 172.26H72.02L24.96 34.52v5c0 4 .11 10.1.33 18.29.22 8.19.33 14.21.33 18.07v96.39H4.5V8.95Z"
        className="cls-1"
      />
      <path
        d="M165.75 176.76h-30.12V75.87c0-2.88.05-7.3.16-13.18L97.18 176.76H68.81L29.92 62.97c.13 5.59.2 9.92.2 12.91v100.89H0V4.45h39.42L83.14 133 126.55 4.45h39.2v172.31Zm-21.12-9h12.12V13.45h-11.68v21.07c0 8.77-.08 17.14-.22 24.88-.15 7.57-.22 13.11-.22 16.48v91.89Zm-69.39 0h15.48l52.23-154.31H133L83.16 161.04 32.97 13.45H22.51l52.73 154.31Zm-66.24 0h12.12V75.87c0-3.79-.11-9.83-.33-17.94-.22-8.18-.33-14.37-.33-18.41V13.45H9v154.31ZM255.84 8.95h25.01l59.25 163.31h-24.24l-16.56-48.92h-64.59l-17.68 48.92h-22.68L255.84 8.95Zm36.36 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M346.53 176.76h-33.88l-16.56-48.92h-58.2l-17.68 48.92h-32.34L252.73 4.45h31.28l62.52 172.31Zm-27.43-9h14.59L277.7 13.45h-18.74l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.6-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm140.86 18.73c.5 9.27 2.61 16.79 6.32 22.57 7.07 10.82 19.53 16.23 37.37 16.23 8 0 15.28-1.18 21.85-3.56 12.71-4.59 19.06-12.82 19.06-24.68 0-8.89-2.69-15.23-8.08-19.01-5.46-3.71-14-6.93-25.63-9.67l-21.43-5c-14-3.26-23.91-6.85-29.72-10.78-10.05-6.82-15.08-17.01-15.08-30.57 0-14.67 4.94-26.72 14.82-36.13 9.88-9.41 23.87-14.12 41.98-14.12 16.66 0 30.81 4.13 42.46 12.4 11.65 8.27 17.47 21.47 17.47 39.63h-20.79c-1.07-8.74-3.34-15.45-6.82-20.12-6.47-8.52-17.44-12.78-32.93-12.78-12.51 0-21.5 2.74-26.97 8.23-5.47 5.49-8.21 11.86-8.21 19.12 0 8 3.23 13.86 9.69 17.57 4.24 2.37 13.82 5.34 28.76 8.89l22.19 5.23c10.7 2.52 18.96 5.97 24.77 10.34 10.05 7.63 15.08 18.72 15.08 33.24 0 18.08-6.41 31.02-19.24 38.8-12.83 7.78-27.74 11.67-44.72 11.67-19.81 0-35.31-5.19-46.51-15.56-11.21-10.3-16.7-24.27-16.48-41.91h20.79Z"
        className="cls-1"
      />
      <path
        d="M430.55 181.54c-20.88 0-37.56-5.64-49.57-16.76-12.12-11.14-18.16-26.38-17.92-45.27l.06-4.44h29.5l.23 4.26c.46 8.43 2.34 15.29 5.61 20.38 6.22 9.52 17.21 14.16 33.59 14.16 7.44 0 14.27-1.11 20.32-3.29 10.98-3.97 16.09-10.47 16.09-20.45 0-7.4-2.02-12.42-6.16-15.33-4.92-3.34-13.04-6.37-24.08-8.98l-21.42-5c-14.68-3.42-24.89-7.16-31.22-11.44-11.32-7.68-17.06-19.22-17.06-34.3 0-15.88 5.46-29.14 16.22-39.39C395.44 5.5 410.61.33 429.82.33c17.53 0 32.69 4.45 45.07 13.23 12.85 9.12 19.37 23.69 19.37 43.3v4.5h-29.27l-.48-3.96c-.97-7.92-2.97-13.97-5.96-17.98-5.52-7.27-15.39-10.97-29.33-10.97-11.21 0-19.21 2.32-23.78 6.9-4.64 4.65-6.89 9.86-6.89 15.94 0 6.41 2.36 10.75 7.43 13.66 2.61 1.46 9.54 4.13 27.56 8.42l22.18 5.22c11.26 2.65 20.16 6.39 26.45 11.12 11.2 8.51 16.88 20.9 16.88 36.84 0 19.68-7.2 34.03-21.41 42.65-13.48 8.18-29.31 12.33-47.06 12.33Zm-58.42-57.48c.67 14.3 5.58 25.49 14.95 34.1 10.3 9.54 24.92 14.38 43.47 14.38 16.07 0 30.33-3.71 42.39-11.02 11.49-6.97 17.08-18.4 17.08-34.95 0-13.16-4.35-22.86-13.3-29.66-5.27-3.96-13.04-7.18-23.08-9.54l-22.19-5.23c-15.5-3.69-25.29-6.75-29.93-9.35-7.86-4.51-12-11.93-12-21.49 0-8.46 3.2-15.97 9.52-22.3 6.32-6.34 16.47-9.55 30.15-9.55 16.9 0 29.19 4.9 36.52 14.56 3.39 4.55 5.78 10.7 7.12 18.34h12.28c-.85-14.39-5.93-24.71-15.45-31.46-10.82-7.67-24.23-11.57-39.86-11.57-16.82 0-29.9 4.33-38.87 12.88-9.03 8.61-13.42 19.36-13.42 32.87 0 12.08 4.29 20.87 13.1 26.85 5.32 3.6 14.82 7 28.22 10.12l21.43 5c12.29 2.9 21.16 6.28 27.14 10.33 6.69 4.69 10.05 12.33 10.05 22.73 0 9.56-3.82 22.33-22.03 28.91-7.03 2.54-14.89 3.83-23.38 3.83-19.38 0-33.22-6.15-41.14-18.27-3.54-5.51-5.78-12.4-6.69-20.53h-12.07Zm301.8-91.77c10.82 14.45 16.23 32.94 16.23 55.47 0 24.38-6.19 44.65-18.57 60.81-14.53 18.97-35.24 28.46-62.14 28.46-25.12 0-44.88-8.3-59.25-24.9-12.82-16.01-19.23-36.24-19.23-60.7 0-22.08 5.48-40.98 16.45-56.7C561.5 14.57 582.33 4.49 609.9 4.49s50.17 9.27 64.03 27.79Zm-19.51 104.1c8.71-13.98 13.06-30.06 13.06-48.23 0-19.21-5.02-34.68-15.06-46.4-10.04-11.72-23.77-17.58-41.19-17.58s-30.68 5.81-41.36 17.41-16.01 28.72-16.01 51.35c0 18.1 4.58 33.36 13.73 45.79s23.99 18.64 44.52 18.64 33.59-6.99 42.3-20.97Z"
        className="cls-1"
      />
      <path
        d="M609.45 181.54c-26.37 0-47.45-8.9-62.66-26.46l-.11-.13c-13.42-16.75-20.22-38.12-20.22-63.51 0-22.92 5.81-42.86 17.26-59.27C558.63 10.83 580.89.01 609.89.01s52.95 9.96 67.64 29.6c11.36 15.18 17.13 34.75 17.13 58.17 0 25.28-6.56 46.66-19.49 63.55-15.35 20.05-37.46 30.22-65.72 30.22Zm-55.79-32.29c13.6 15.67 31.85 23.28 55.8 23.28 25.66 0 44.82-8.73 58.57-26.69 11.7-15.28 17.64-34.82 17.64-58.08 0-21.43-5.16-39.19-15.33-52.78-13.08-17.49-32.85-25.99-60.43-25.99s-45.48 9.26-58.79 28.32c-10.38 14.87-15.64 33.08-15.64 54.12 0 23.26 6.12 42.71 18.19 57.82Zm58.46 12.61c-21.94 0-38.14-6.89-48.15-20.47-9.69-13.15-14.61-29.46-14.61-48.45 0-23.68 5.79-41.98 17.2-54.39 11.51-12.52 26.54-18.87 44.67-18.87s33.71 6.44 44.61 19.15c10.71 12.5 16.15 29.1 16.15 49.32 0 18.94-4.62 35.97-13.74 50.61-9.54 15.32-25.06 23.09-46.12 23.09Zm-.89-133.18c-15.73 0-28.17 5.22-38.04 15.96-9.83 10.7-14.82 26.95-14.82 48.3 0 17.04 4.32 31.54 12.85 43.12 8.33 11.31 21.71 16.81 40.9 16.81 17.99 0 30.58-6.17 38.48-18.85l3.82 2.38-3.82-2.38c8.22-13.19 12.38-28.62 12.38-45.85S658.28 55.53 649 44.7c-9.23-10.77-21.59-16.01-37.77-16.01ZM730.17 8.95h26.06l81.44 131.95V8.95h21.12v163.31h-24.85L751.29 40.47v131.79h-21.12V8.95Z"
        className="cls-1"
      />
      <path
        d="M863.3 176.76h-31.84L755.8 56.11v120.65h-30.12V4.45h33.07l74.43 120.59V4.45h30.12v172.31Zm-26.87-9h17.86V13.45h-12.12v143.31L753.72 13.45h-19.05v154.31h12.12V24.82l89.64 142.94Zm-644.6 38.38h31.69l46.96 138.07 46.63-138.07h31.47v163.31h-21.12v-96.39c0-3.34.07-8.86.22-16.56.15-7.71.22-15.97.22-24.79l-46.63 137.74h-21.92l-47.07-137.74v5c0 4 .11 10.1.33 18.29.22 8.19.33 14.21.33 18.07v96.39h-21.12V206.15Z"
        className="cls-1"
      />
      <path
        d="M353.08 373.95h-30.12V273.06c0-2.87.05-7.3.16-13.18l-38.61 114.07h-28.37l-38.89-113.79c.13 5.59.2 9.92.2 12.91v100.89h-30.12V201.65h39.42l43.72 128.55 43.41-128.55h39.2v172.31Zm-21.12-9h12.12V210.64H332.4v21.07c0 8.78-.08 17.15-.22 24.88-.15 7.58-.22 13.12-.22 16.48v91.89Zm-69.38 0h15.48l52.23-154.31h-9.95L270.5 358.23l-50.2-147.59h-10.46l52.73 154.31Zm-66.25 0h12.12v-91.89c0-3.79-.11-9.83-.33-17.94-.22-8.18-.33-14.37-.33-18.41v-26.07h-11.46v154.31Zm246.85-158.81h25.01l59.25 163.31H503.2l-16.56-48.92h-64.59l-17.68 48.92h-22.68l61.48-163.31Zm36.35 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M533.86 373.95h-33.88l-16.56-48.92h-58.2l-17.68 48.92H375.2l64.87-172.31h31.28l62.52 172.31Zm-27.42-9h14.59l-55.99-154.31H446.3l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.61-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm228.35-91.88v19.45h-55.03v143.86h-22.35V225.59h-55.03v-19.45h132.4Z"
        className="cls-1"
      />
      <path
        d="M612.64 373.95h-31.35V230.09h-55.03v-28.46h141.4v28.46h-55.03v143.86Zm-22.35-9h13.35V221.09h55.03v-10.46h-123.4v10.46h55.03v143.86Zm107.44-158.81h22.35v67.48h83.93v-67.48h22.35v163.31h-22.35v-76.37h-83.93v76.37h-22.35V206.14Z"
        className="cls-1"
      />
      <path
        d="M830.86 373.95h-31.34v-76.38h-74.93v76.38h-31.34V201.64h31.34v67.48h74.93v-67.48h31.34v172.31Zm-22.35-9h13.34V210.64h-13.34v67.48h-92.93v-67.48h-13.34v154.31h13.34v-76.38h92.93v76.38Zm114.22-158.81h25.01l59.25 163.31h-24.24l-16.56-48.92H901.6l-17.68 48.92h-22.68l61.48-163.31Zm36.35 96.38-24.79-72.15-26.35 72.15h51.14Z"
        className="cls-1"
      />
      <path
        d="M1013.42 373.95h-33.88l-16.56-48.92h-58.2l-17.68 48.92h-32.34l64.87-172.31h31.28l62.52 172.31Zm-27.43-9h14.59l-55.99-154.31h-18.75l-58.09 154.31h13.02l17.68-48.92h70.98l16.56 48.92Zm-20.6-57.93h-63.88l32.91-90.12 30.97 90.12Zm-51.01-9h38.4l-18.62-54.18-19.78 54.18Zm131.4-91.88h22.35v163.31h-22.35V206.14Z"
        className="cls-1"
      />
      <path
        d="M1072.63 373.95h-31.35V201.64h31.35v172.31Zm-22.35-9h13.35V210.64h-13.35v154.31Z"
        className="cls-1"
      />
    </g>
  </svg>
)

export const LinkArrow = ({ props, className }: SVGElementProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    data-name="Layer 2"
    viewBox="0 0 26.66 26.37"
    {...props}
  >
    <defs>
      <style>{'.cls-1{fill:#231f20;stroke-width:0}'}</style>
    </defs>
    <g id="Layer_1-2" data-name="Layer 1">
      <path
        d="M.001 24.258 23.838.422l2.12 2.12L2.123 26.38z"
        className="cls-1"
      />
      <path d="M13.93 0h12.72v3H13.93z" className="cls-1" />
      <path d="M23.63.5h3v12.02h-3z" className="cls-1" />
    </g>
  </svg>
)
