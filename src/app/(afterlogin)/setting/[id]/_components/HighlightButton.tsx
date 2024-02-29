'use client';

import { Modifier, EditorState } from 'draft-js';
import PenIcon from './_svgs/PenIcon';
import styles from './ToolbarButtons.module.scss';

const HighlightButton = ({ getEditorState, setEditorState }: any) => {
  const applyHighlight = (color: any) => {
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    // 현재 선택된 범위의 스타일
    const stylesAtSelection = currentContent
      .getBlockForKey(selectionState.getStartKey())
      .getInlineStyleAt(selectionState.getStartOffset());

    // 새로운 스타일을 추가하면서 기존 스타일을 유지
    let newContentState = stylesAtSelection.reduce((contentState: any, style: any) => {
      return Modifier.removeInlineStyle(contentState, selectionState, style);
    }, currentContent);

    newContentState = Modifier.applyInlineStyle(newContentState, selectionState, color);

    // 새로운 에디터 상태 설정
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        applyHighlight('PINK');
      }}
      className={styles.toolbarButton}
    >
      <PenIcon />
      형광펜
    </button>
  );
};

export default HighlightButton;
