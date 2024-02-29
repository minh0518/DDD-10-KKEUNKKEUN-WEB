'use client';

import { Modifier, EditorState } from 'draft-js';
import TrashcanIcon from './_svgs/TrashcanIcon';
import styles from './ToolbarButtons.module.scss';

const RemoveHighlightButton = ({ getEditorState, setEditorState }: any) => {
  const removeHighlight = (color: any) => {
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    // 선택된 범위에서 하이라이팅 스타일을 제거합니다.
    const newContentState = Modifier.removeInlineStyle(currentContent, selectionState, color);

    // 새로운 에디터 상태를 설정합니다.
    const newState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newState);
  };

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        removeHighlight('PINK');
      }}
      className={styles.toolbarButton}
    >
      <TrashcanIcon />
      지우기
    </button>
  );
};

export default RemoveHighlightButton;
