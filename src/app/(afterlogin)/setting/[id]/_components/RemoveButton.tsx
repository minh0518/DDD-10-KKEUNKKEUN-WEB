'use client';

import { Modifier, EditorState } from 'draft-js';

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
        removeHighlight('BLUE');
      }}
    >
      하이라이트 제거
    </button>
  );
};

export default RemoveHighlightButton;
