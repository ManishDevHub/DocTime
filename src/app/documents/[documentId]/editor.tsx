"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { list } from 'postcss'
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from '@/app/Store/use-editor-store'
import Underline from '@tiptap/extension-underline'



export default function Editor() {

  const { setEditor } = useEditorStore();
     const editor = useEditor({
      onCreate({editor}) {
setEditor(editor);

      },
        onDestroy() {
setEditor(null);

      },
        onUpdate({editor}) {
setEditor(editor);

      },
        onSelectionUpdate({editor}) {
setEditor(editor);

      },
        onTransaction({editor}) {
setEditor(editor);

      },
        onFocus({editor}) {
setEditor(editor);

      },
        onBlur({editor}) {
setEditor(editor);

      },
        onContentError({editor}) {
setEditor(editor);

      },
        editorProps:{
            attributes:{
                style: "padding-left: 56px; padding-right: 56px;",
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 cursor-text"
            },

        },
    extensions: [
      
      StarterKit,
     Color,
  Highlight.configure({
  multicolor: true,
}),
   
      Image,
      ImageResize,
       Underline,
       
    ],
    content: '<p>Hello World! 🌎️</p>',
     })
     
  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print: bg-white print:overflow-visible'>
       <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent className=''  editor={editor}/>
        </div>
    </div>
  )
}
