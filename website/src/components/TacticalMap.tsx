export function TacticalMap() {
  return (
    <div className="tactical-map" aria-hidden="true">
      <svg className="tactical-map__svg" viewBox="0 0 320 160" fill="none" focusable="false">
        <defs>
          <filter id="romania-node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="tactical-map__land" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 48L70 34L98 33L122 42L143 37L167 42L185 55L207 58L232 74L253 92L242 111L214 116L191 107L168 118L139 109L118 116L94 105L72 110L58 94L45 76L52 48Z" />
          <path d="M104 71L123 63L143 66L158 79L182 81L197 97L185 113L163 116L145 104L124 108L109 96L96 83L104 71Z" />
          <path d="M156 73L174 70L190 77L197 90L186 98L167 96L154 86L156 73Z" />
          <path d="M206 99L225 101L238 112L229 124L209 120L198 108L206 99Z" />
          <path d="M73 44L65 60L74 76L89 82" />
          <path d="M132 43L126 58L134 70" />
          <path d="M92 106L88 123L104 131L127 126" />
          <path d="M162 117L175 136L197 132L213 116" />
        </g>

        <g className="tactical-map__balkan" strokeLinecap="round" strokeLinejoin="round">
          <path d="M161 82L175 80L188 88L192 101L184 114L168 116L154 108L150 94L161 82Z" />
          <path d="M179 116L188 130L181 142" />
          <path d="M151 104L139 116L143 128" />
        </g>

        <g className="tactical-map__connections">
          <path d="M183 82C204 72 223 74 245 86" />
          <path d="M183 82C170 102 154 118 133 130" />
        </g>

        <g className="tactical-map__markers">
          <path d="M78 54h14M85 47v14" />
          <path d="M230 99h12M236 93v12" />
          <circle cx="132" cy="130" r="2" />
          <circle cx="245" cy="86" r="2" />
        </g>

        <g className="tactical-map__romania" transform="translate(183 82)">
          <circle className="tactical-map__pulse" r="18" />
          <circle className="tactical-map__pulse tactical-map__pulse--late" r="18" />
          <circle className="tactical-map__node-glow" r="8" filter="url(#romania-node-glow)" />
          <circle className="tactical-map__node" r="3.4" />
          <path d="M-12 0H-5M5 0H12M0 -12V-5M0 5V12" />
        </g>
      </svg>

      <div className="tactical-map__scan" />
      <div className="tactical-map__label tactical-map__label--top">44.4268 N / 26.1025 E</div>
      <div className="tactical-map__label tactical-map__label--bottom">NODE: RO-01 / ACTIVE</div>
    </div>
  );
}
