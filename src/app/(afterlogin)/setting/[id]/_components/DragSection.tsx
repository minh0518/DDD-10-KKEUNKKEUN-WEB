'use client';

import { useEffect, useMemo, useState } from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import { stateToHTML } from 'draft-js-export-html';
import './DragSection.scss';

import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import HighlightButton from './HighlightButton';
import RemoveButton from './RemoveButton';

// 인라인 스타일 적용 옵션
const styleMap = {
  BLUE: {
    backgroundColor: '#FF2E7B',
  },
};
const DragSection = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('my-draft');
    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  const saveContent = () => {
    // 인라인 스타일 적용된 데이터
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    // 인라인 스타일이 적용된 HTML 반환값 적용
    const options = {
      inlineStyles: {
        RED: { style: { color: '#ff0000' } },
        BLUE: { style: { backgroundColor: '#6ea4eb' } },
      },
    };
    const html = stateToHTML(contentState, options);
    // console.log(html);
    // console.log(raw);

    localStorage.setItem('my-draft', JSON.stringify(raw, null, 2));
  };
  return (
    <div className="container">
      <div className="contentSection">
        {/* <button onClick={saveContent}>저장</button> */}

        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="여기에 입력하십시요..."
          customStyleMap={styleMap} // 커스텀 스타일 맵 적용
          plugins={plugins}
        />
        <InlineToolbar>
          {(externalProps) => (
            <>
              <HighlightButton {...externalProps} />
              <RemoveButton {...externalProps} />
            </>
          )}
        </InlineToolbar>
      </div>
    </div>
  );
};

export default DragSection;
