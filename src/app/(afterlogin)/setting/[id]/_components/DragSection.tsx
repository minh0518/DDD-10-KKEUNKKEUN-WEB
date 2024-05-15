'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import { stateToHTML } from 'draft-js-export-html';
import './DragSection.scss';

import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import HighlightButton from './HighlightButton';
import RemoveButton from './RemoveButton';
import { SlidesSettingType } from '@/types/service';

interface DragSectionProps {
  currentPage: number;
  onChangeSlide: (
    index: number,
    memorizationSentences: {
      offset: SlidesSettingType['slides'][0]['memorizationSentences'][0]['offset'];
      length: SlidesSettingType['slides'][0]['memorizationSentences'][0]['length'];
    }[],
  ) => void;
}

// 인라인 스타일 적용 옵션
const styleMap = {
  PINK: {
    backgroundColor: '#FF2E7B',
  },
};
const DragSection = ({ currentPage, onChangeSlide }: DragSectionProps) => {
  const isFirstRender = useRef(true); // 첫 렌더링을 추적하는 ref
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem('draftData');

    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      isFirstRender.current = false;
    }
  }, [currentPage]);

  const saveContent = () => {
    // 인라인 스타일 적용된 데이터
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    // 인라인 스타일이 적용된 HTML 반환값 적용
    const options = {
      inlineStyles: {
        PINK: { style: { color: '#FF2E7B' } },
      },
    };
    const html = stateToHTML(contentState, options);
    // console.log(html);
    // console.log(raw);

    const infoForValue = raw.blocks[0].inlineStyleRanges.map((i) => {
      return { offset: i.offset, length: i.length };
    });

    onChangeSlide(currentPage, infoForValue);
    localStorage.setItem('draftData', JSON.stringify(raw, null, 2));
  };

  const onEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (!isFirstRender.current) saveContent(); // 최초 렌더링때는 동작x
  };

  return (
    <div className="container">
      <div className="contentSection">
        {/* <button onClick={saveContent}>저장</button> */}

        <Editor
          editorState={editorState}
          onChange={onEditorChange}
          placeholder="여기에 입력하십시요..."
          customStyleMap={styleMap} // 커스텀 스타일 맵 적용
          plugins={plugins}
        />
        <InlineToolbar>
          {(externalProps) => (
            <div className="toolbar">
              <HighlightButton {...externalProps} />
              <RemoveButton {...externalProps} />
            </div>
          )}
        </InlineToolbar>
      </div>
    </div>
  );
};

export default DragSection;
