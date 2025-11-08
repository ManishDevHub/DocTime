"use client"


import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
     const editor = useEditor({
        editorProps:{
            attributes:{
                class: "focus:outline-none"
            },

        },
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
     })
  return (
    <div>
        <EditorContent  editor={editor}/>
    </div>
  )
}
