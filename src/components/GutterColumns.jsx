import React from 'react';
import { Terminal, Cpu, Globe, Award, Layers, Flame, Hash, Heart } from 'lucide-react';
import { useAppLogic } from '../hooks/useAppLogic';

const GutterColumns = () => {
  useAppLogic();

  return (
    <>
      {/* FIXED GUTTER STAMP COLUMNS (Left / Right) */}
      <aside className="col L">
        <div className="col-t">
          <div className="col-c" title="Terminal"><Terminal /></div>
          <div className="col-c" title="Algorithms"><Cpu /></div>
          <div className="col-c" title="Global Scope"><Globe /></div>
          <div className="col-c" title="Excellence"><Award /></div>
          <div className="col-scroll-bar">
            <div className="col-scroll-bar-inner">
              <div className="col-scroll-progress" style={{ height: '0%' }} />
            </div>
          </div>
        </div>
      </aside>

      <aside className="col R">
        <div className="col-t">
          <div className="col-c" title="Layers"><Layers /></div>
          <div className="col-c" title="Passion"><Flame /></div>
          <div className="col-c" title="Logic"><Hash /></div>
          <div className="col-c" title="Design"><Heart /></div>
          <div className="col-scroll-bar">
            <div className="col-scroll-bar-inner">
              <div className="col-scroll-progress" style={{ height: '0%' }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default GutterColumns;
