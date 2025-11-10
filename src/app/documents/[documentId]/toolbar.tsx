"use client"

import { useEditorStore } from '@/app/Store/use-editor-store';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { BoldIcon, ItalicIcon,  LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, Section, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react';

import React from 'react'
import { isActive } from '@tiptap/core';
import { Item } from '@radix-ui/react-accordion';


interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?:boolean;
    icon: LucideIcon
}

const ToolbarButton = ({
     onClick,
   
    isActive,
    icon: Icon,
   
}: ToolbarButtonProps) => {

    return (
        <button
        onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}
        >
            <Icon  className='size-4'/>
        </button>
    )
}

export default function Toolbar() {
const { editor } = useEditorStore();


const sections: {
    lable: string,
    icon: LucideIcon,
    onClick: () => void,
    isActive?: boolean,
} [] [] = [
    [
        {
            lable: "Undo",
            icon: Undo2Icon,
            onClick: () => editor?.chain().focus().undo().run(),
        },
         {
            lable: "Redu",
            icon: Redo2Icon,
            onClick: () => editor?.chain().focus().redo().run(),
        },
         {
            lable: "Print",
            icon: PrinterIcon,
            onClick: () => window.print(),
        },
         {
            lable: "SpellCheck",
            icon: SpellCheckIcon,
            onClick: () => {
                const current = editor?.view.dom.getAttribute("spellcheck");
                editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
            },
        },


    ],
    [
        {
            lable: "Bold",
            icon:  BoldIcon,
            isActive: editor?.isActive("bold"),
            onClick: () => editor?.chain().focus().toggleBold().run(),
             
        },
           {
            lable: "Italic",
            icon:  ItalicIcon,
            isActive: editor?.isActive("italic"),
            onClick: () => editor?.chain().focus().toggleItalic().run(),
             
        },
          {
            lable: "Underline",
            icon:  UnderlineIcon,
            isActive: editor?.isActive("underline"),
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
             
        },
        

    ],
    [
        {
            lable: "Comment",
            icon: MessageSquarePlusIcon,
            onClick: () => console.log("TODO: Comment"),
            isActive: false, // Todo Enable this functionality
        },
         {
            lable: "Remove Formating",
            icon: RemoveFormattingIcon,
            onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            isActive: editor?.isActive("taskList"),
        },
        
    ]
]

  return (
    <div className='bg-[#F1F4F9] PX-2.5 round-[24px] min-h-[40px] flex items-center
    gap-x-0.5 overflow-x-auto'>
        {
            sections[0].map((item) =>(
                <ToolbarButton key={item.lable} {...item} />
            )) } 

        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
        {/* TODO : Font family */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
        {/* TODO : Heading */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
        {/* TODO : Font Size */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300' />
       {sections[1].map((item) => (
      <button
        key={item.lable}
        onClick={item.onClick}
        className={`p-2 rounded ${item.isActive ? "bg-gray-200" : ""}`}
      >
        <item.icon size={18} />
      </button>
    ))}
     {/* TODO : Text Color */}
      {/* TODO : Highlight color */}
       <Separator orientation='vertical' className='h-6 bg-neutral-300' />
       {/* TODO :Link  */}
        {/* TODO :Image  */}
         {/* TODO :Aline */}
          {/* TODO :Line hight  */}
           {/* TODO :List */}
 {
            sections[2].map((item) =>(
                <ToolbarButton key={item.lable} {...item} />
            )) } 

        </div>
  )
}
